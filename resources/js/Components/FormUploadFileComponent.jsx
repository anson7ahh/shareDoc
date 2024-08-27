import { useContext, useRef, useState } from "react";

import Category from "@/Components/CategoryParentComponent";
import { TitleContext } from "@/Components/UploadComponent";
import axios from 'axios';
import { useForm } from "@inertiajs/react";

export default function FormUploadFile({ id }) {
    const { data, setData } = useForm({
        title: '',
        description: "",
        source: "",
        point: "",
        category_id: "",
    });
    const [message, setMessage] = useState("");
    const formRef = useRef(null);
    const Title = useContext(TitleContext)
    const handleSetCategory = (CategoryId) => {
        setData('category_id', CategoryId);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formUpdate = new FormData();
        formUpdate.append('title', Title);
        formUpdate.append('description', data.description);
        formUpdate.append('source', data.source);
        formUpdate.append('point', data.point);
        formUpdate.append('category_id', data.category_id);
        // console.log('form data', formUpdate);
        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        // }
        axios({
            url: `/upload/${id}`,
            method: "post",
            data: formUpdate,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then((response) => {
                setMessage('Tải lên thành công!');
                if (formRef.current) {
                    formRef.current.style.display = 'none';
                }

                console.log('Response file:', response.data);
            })
            .catch((error) => {
                console.log('Upload error:', error);
            });
    };

    return (
        <>
            {message && (
                <div className="mt-4 p-4  rounded-lg text-black bg-blue-50">
                    {message}
                    <div>Thông tin file tải lên</div>
                    <div>Tên đề file : {Title}</div>
                    <div>Giá: {data.point}</div>
                    <div>Mô tả: {data.description}</div>
                </div>
            )}
            <form ref={formRef}>
                <div className="flex flex-col gap-4 mt-2" id="fileDetail">
                    <p className="text-pretty font-bold font-mono text-xl">Thêm thông tin cho tài liệu </p>
                    <label
                        htmlFor="title"
                        className=" text-lg font-mono text-gray-700 mb-1"
                    >
                        Tên tài liệu
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={Title}
                        readOnly
                        placeholder="Tên tài liệu"
                        className="block w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />

                    <Category handleSetCategory={handleSetCategory} />
                    <label
                        htmlFor="description"
                        className=" text-lg font-mono text-gray-700 mb-1"
                    >
                        Mô tả
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        value={data.description}
                        placeholder="Mô tả chi tiết tài liệu của bạn ."
                        className="border border-gray-300 p-2 rounded resize-none h-[120px] focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => setData("description", e.target.value)}
                        required
                    ></textarea>
                    <label
                        htmlFor="source"
                        className=" text-lg font-mono text-gray-700 mb-1"
                    >
                        Nguồn(nếu có)
                    </label>
                    <input
                        type="text"
                        name="source"
                        id="source"
                        placeholder="Nguồn (nếu có)"
                        className="border border-gray-300 p-2 rounded"
                        onChange={(e) => setData("source", e.target.value)}
                    />
                    <label
                        htmlFor="point"
                        className=" text-lg font-mono text-gray-700 mb-1"
                    >
                        Giá
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="point"
                        id="point"
                        value={data.point}
                        placeholder="Giá"
                        className="border border-gray-300 p-2 rounded text-gray-500"
                        onChange={(e) => setData("point", e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded "
                        disabled={!Title || !data.point}
                        onClick={handleSubmit}
                    >
                        Lưu thông tin
                    </button>
                </div>

            </form >
        </>
    )
}