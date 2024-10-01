import { setFile, uploadFile } from '@/redux/FileSlice';
import { useDispatch, useSelector } from 'react-redux';

import Progress from '@/Components/Progress';
import React from 'react';
import { memo } from 'react';

const UploadLayout = () => {
    const { file, progress, uploadStatus, message } = useSelector((state) => state.file);
    const dispatch = useDispatch();

    const handleChangeFile = (e) => {
        const selectedFile = e.target.files[0];
        dispatch(setFile(selectedFile));
        dispatch(uploadFile(selectedFile))
    };

    return (
        <div className="pt-[120px] mx-20">
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

                <Progress progress={progress} status={uploadStatus} message={message} />

            </div>
        </div>
    );
};

export default memo(UploadLayout);
