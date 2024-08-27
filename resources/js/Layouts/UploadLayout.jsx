import { memo, useContext } from "react";

import FooterLayout from "./FooterLayout";
import UploadComponent from "@/Components/UploadComponent";
import { useForm } from "@inertiajs/react";

const UploadLayout = ({ }) => {
    const { data, setData } = useForm({
        file: null,
    });
    const handleChangeFile = ((e) => {
        const file = e.target.files[0];
        setData({
            ...data,
            file: file,

        });
    });
    return (
        <>
            <div className="pt-[120px] mx-20 ">
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
                <UploadComponent file={data.file} />

                <FooterLayout />

            </div>
        </>
    );
}

export default memo(UploadLayout)