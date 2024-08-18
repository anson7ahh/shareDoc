import { useForm, usePage } from "@inertiajs/react";

import Category from "@/Components/CategoryComponent";
import FooterLayout from "./FooterLLayoout";
import Progress from "@/Components/Progress";
import { useCallback } from "react";

export default function UploadLayout() {
    const { categoriesParent } = usePage().props;
    const { data, setData, post } = useForm({
        file: null,
        title: "",
        description: "",
        source: "",
        point: "",

    });

    const handleChangeFile = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {

            if (data.file !== file) {
                setData({
                    ...data,
                    file: file,
                    title: file.name,
                });
            }
        }
    }, [data.file]);
    return (
        <>
            <div className="pt-[120px] mx-20 ">
                <form
                    className=""
                    onSubmit={(e) => {
                        e.preventDefault();
                        post("/upload");
                    }}
                >
                    <div className="flex flex-col items-center border-dotted border-2 border-indigo-600">
                        <div>
                            <p className="my-4 text-center font-bold text-2xl font-sans">
                                Tải tài liệu lên
                            </p>
                        </div>
                        <label htmlFor="file">
                            <div className="bg-green-200 flex justify-center item-center p-4 rounded-3xl border border-gray-300 border-dashed cursor-pointer">
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
                                    onChange={handleChangeFile}

                                />
                            </div>
                        </label>
                        <div className="p-4 rounded-md bg-white text-gray-800">
                            <p className="mb-2 text-center">
                                Chọn nút Tải lên để chọn nhiều tài liệu từ máy tính của
                                bạn hoặc kéo tài liệu thả vào đây.
                            </p>
                            <p className="mb-2 text-center">
                                Tối đa 50 tài liệu với kích thước mỗi tài liệu 100MB.
                            </p>
                            <p className="mb-2 text-center">
                                Các định dạng tài liệu: doc, pdf, docx .
                            </p>
                        </div>
                    </div>
                    <Progress file={data.file} />
                    {data?.file ?
                        <div className="flex flex-col gap-4 mt-2" id="fileDetail">
                            <div><p className="text-pretty font-bold font-mono text-xl">Thêm thông tin cho tài liệu </p></div>
                            <div>
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
                                    value={data.title}
                                    placeholder="Tên tài liệu"
                                    className="block w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    onChange={(e) => setData("title", e.target.value)}
                                />
                            </div>
                            <Category categoriesParent={categoriesParent} />
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
                                value={data.source}
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
                                type="submit"
                                id="submit-btn"
                                className="bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                disabled={!data.file || !data.title || !data.point}
                            >
                                Lưu thông tin
                            </button>
                        </div>
                        : (<div className="hidden"></div>)}
                </form>

                <FooterLayout />
            </div>

        </>
    );
}

