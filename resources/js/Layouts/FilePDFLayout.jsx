import { Document, Page } from 'react-pdf';

import ButtonDownloadComponent from '@/Components/ButtonDownloadComponent';
import { useState } from 'react';

function FilePDF({ data }) {
    const [numPages, setNumPages] = useState(null); // Số lượng trang PDF
    const [visiblePages, setVisiblePages] = useState(1); // Số trang hiển thị ban đầu
    const [numvisiblePages, setNumvisiblePages] = useState(0); // Tổng số lần click

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages); // Lưu số trang của tài liệu PDF
    }

    function handleShowMore() {
        // Khi bấm "Xem thêm", hiển thị thêm 4 trang
        setVisiblePages(prevVisible => Math.min(prevVisible + 4, numPages));
        setNumvisiblePages(prevVisible => prevVisible + 1);
    }

    return (
        <div className="max-w-4xl p-6 bg-gray-100  rounded-lg ">
            {/* Load tài liệu PDF */}
            <div className="bg-white p-4 rounded-lg  mb-6 flex  items-center flex-col">
                <Document
                    file={`/storage/file/${data.content}.pdf`}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    {/* Hiển thị các trang PDF */}
                    {Array.from(
                        new Array(visiblePages), // Hiển thị số trang giới hạn
                        (el, index) => (
                            <Page
                                key={index + 1} // Sử dụng index + 1 làm key duy nhất cho mỗi trang
                                pageNumber={index + 1}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                className="mb-4 shadow-md border border-gray-200 rounded-lg"
                            />
                        )
                    )}
                </Document>
            </div>

            {/* Nút "Xem thêm" và "Tải xuống" */}
            <div className="flex justify-between gap-4 mb-6">
                {visiblePages < numPages && numvisiblePages < 3 && (
                    <button
                        onClick={handleShowMore}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all ease-in-out duration-300 w-full"
                    >
                        Xem thêm
                    </button>
                )}
                <div className='w-full'>
                    <ButtonDownloadComponent document={data} />
                </div>
            </div>

            {/* Thông tin tài liệu */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Thông tin tài liệu</h3>
                <div className="text-gray-700">
                    <p className="font-medium mb-2">Nội dung</p>
                    <div className="text-sm">{data.description != "null" ? data.description : "Không có thông tin"}</div>
                </div>
            </div>
        </div>
    );
}

export default FilePDF;
