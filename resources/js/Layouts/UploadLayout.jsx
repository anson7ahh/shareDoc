import { useEffect, useRef, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";

import axios from "axios";

export default function UploadLayout() {
    const { data, setData } = useForm({
        file: null,
    });
    const { categoriesParent } = usePage().props;
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const source = axios.CancelToken.source();

        // Kiểm tra nếu data.file tồn tại
        if (data.file) {
            const formData = new FormData();
            formData.append("file", data.file);
            console.log(data.file);
            axios({
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                url: "/upload",
                method: "post",
                data: formData,
                onUploadProgress: (progressEvent) => {
                    const totalLength = progressEvent.lengthComputable
                        ? progressEvent.total
                        : progressEvent.target.getResponseHeader(
                              "content-length"
                          ) ||
                          progressEvent.target.getResponseHeader(
                              "x-decompressed-content-length"
                          );
                    console.log("onUploadProgress", totalLength);
                    if (totalLength !== null) {
                        this.updateProgressBarValue(
                            Math.round(
                                (progressEvent.loaded * 100) / totalLength
                            )
                        );
                    }
                },
            })
                .then(function (response) {
                    console.log(response);
                    setProgress(100);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        return () => {
            source.cancel("Operation canceled by the user.");
        };
    }, [data.file]);

    return (
        <form encType="multipart/form-data" className="pt-[120px]  mx-10 ">
            <div className="flex flex-col  items-center border-dotted border-2 border-indigo-600 ">
                <div>
                    <p className="my-4 text-center font-bold text-2xl font-sans">
                        Tải tài liệu lên
                    </p>
                </div>
                <label htmlFor="file">
                    <div className="bg-green-200 flex  justify-center item-center p-4 rounded-3xl border border-gray-300 border-dashed cursor-pointer">
                        <h4 className="text-base font-semibold text-gray-700">
                            Upload file
                        </h4>
                        <input
                            className="border border-gray-300 p-2 rounded"
                            accept=".doc, .docx, .pdf"
                            required
                            hidden
                            id="file"
                            name="file"
                            type="file"
                            onChange={(e) => setData("file", e.target.files[0])}
                        />
                    </div>
                </label>
                <div className="p-4  rounded-md bg-white text-gray-800">
                    <p className="mb-2 text-center">
                        Chọn nút Tải lên để chọn nhiều tài liệu từ máy tính của
                        bạn hoặc kéo tài liệu thả vào đây.
                    </p>
                    <p className="mb-2 text-center">
                        Tối đa 50 tài liệu với kích thước mỗi tài liệu 100MB.
                    </p>
                    <p className="mb-2 text-center">
                        Các định dạng tài liệu: doc, pdf, docx, ppt, pptx, pot,
                        potx, pps, ppsx
                    </p>
                </div>
            </div>
            {progress > 0 && (
                <div className="mt-4  w-full flex flex-row">
                    <div className="bg-gray-200 rounded-full h-4 w-full">
                        <div
                            className="bg-blue-500 h-full w-full rounded-full"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div className="ml-5 text-sm text-gray-700">
                        {progress}%
                    </div>
                </div>
            )}
            <div className="flex flex-col gap-4 mt-2 " id="fileDetail">
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Tên tài liệu"
                    className="border border-gray-300 p-2 rounded"
                />

                <select
                    className=" border border-gray-300 p-2 rounded"
                    name="category_parent_id"
                    placeholder="Chọn danh mục"
                >
                    <option className="my-2">Chọn danh mục</option>
                    {categoriesParent.map((categoryParent) => (
                        <option
                            key={categoryParent.id}
                            value={categoryParent.id}
                            name="categoryParent"
                        >
                            {categoryParent.name}
                        </option>
                    ))}
                </select>

                <textarea
                    name="description"
                    id="description"
                    placeholder="Mô tả"
                    className="border border-gray-300 p-2 rounded resize-none h-[120px] focus:ring-blue-500 focus:border-blue-500"
                    required
                ></textarea>

                <input
                    type="text"
                    name="source"
                    id="source"
                    placeholder="Nguồn (nếu có)"
                    className="border border-gray-300 p-2 rounded"
                />

                <input
                    type="text"
                    name="point"
                    id="point"
                    placeholder="Giá"
                    className="border border-gray-300 p-2 rounded text-gray-500"
                />

                <button
                    type="submit"
                    id="submit-btn"
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                    disabled
                >
                    Upload
                </button>
            </div>
        </form>
    );
}
