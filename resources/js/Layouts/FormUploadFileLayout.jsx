import {
    setDescription,
    setPoint,
    setSource,
    setTitle,
    updateFile
} from '@/redux/FileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

import Category from "@/Components/CategoryParentComponent";

export default function FormUploadFile() {
    const dispatch = useDispatch();
    const { title, description, source, point, messageUpdate } = useSelector((state) => state.file);

    const formRef = useRef();
    const handleChangeTitle = (e) => {
        const title = e.target.value;
        dispatch(setTitle(title));
    }
    const handleChangeDescription = (e) => {
        const description = e.target.value
        dispatch(setDescription(description));
    }
    const handleChangePoint = (e) => {
        const point = e.target.value
        dispatch(setPoint(point));
    }
    const handleChangeSource = (e) => {
        const source = e.target.value
        dispatch(setSource(source));
    }

    useEffect(() => {
        if (messageUpdate) {
            formRef.current.style.display = 'none';

        } else {
            formRef.current.style.display = 'block';
        }
    }, [messageUpdate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const fileData = {
            title,
            description,
            source,
            point
        };
        dispatch(updateFile(fileData))
    };


    return (
        <>
            {messageUpdate && (
                <div className="mt-4 p-4 rounded-lg text-black bg-blue-50">
                    {messageUpdate}
                    <div>Thông tin file tải lên:</div>
                    <div>Tên file: {title}</div>
                    <div>Giá: {point}</div>
                    <div>Mô tả: {description}</div>
                </div>
            )}
            <form ref={formRef} onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 mt-2" id="fileDetail">
                    <p className="text-pretty font-bold font-mono text-xl">Thêm thông tin cho tài liệu</p>

                    <label htmlFor="title" className="text-lg font-mono text-gray-700 mb-1">
                        Tên tài liệu
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={handleChangeTitle}
                        placeholder="Tên tài liệu"
                        className="block w-full border border-gray-300 p-2 rounded"
                    />

                    <Category />

                    <label htmlFor="description" className="text-lg font-mono text-gray-700 mb-1">
                        Mô tả
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        required
                        onChange={handleChangeDescription}
                        placeholder="Mô tả chi tiết tài liệu của bạn."
                        className="border border-gray-300 p-2 rounded resize-none h-[120px]"
                    />

                    <label htmlFor="source" className="text-lg font-mono text-gray-700 mb-1">
                        Nguồn (nếu có)
                    </label>
                    <input
                        type="text"
                        name="source"
                        id="source"

                        onChange={handleChangeSource}
                        placeholder="Nguồn (nếu có)"
                        className="border border-gray-300 p-2 rounded"
                    />

                    <label htmlFor="point" className="text-lg font-mono text-gray-700 mb-1">
                        Giá
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="point"
                        id="point"

                        onChange={handleChangePoint}
                        placeholder="Giá"
                        className="border border-gray-300 p-2 rounded"
                    />

                    <button
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                        disabled={!title || !point || !description}
                        type="submit"


                    >
                        Lưu thông tin
                    </button>
                </div>
            </form>
        </>
    );
}
