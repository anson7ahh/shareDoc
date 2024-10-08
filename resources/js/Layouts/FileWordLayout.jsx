import React, { useEffect, useState } from 'react';

import mammoth from 'mammoth';

function WordViewer({ data }) {
    const [textContent, setTextContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fileUri = `/storage/file/${data.content}.${data.format}`; // Đường dẫn tới tệp Word

        // Tải file và lấy nội dung văn bản bằng Mammoth
        fetch(fileUri)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch file');
                }
                return response.arrayBuffer(); // Đọc file dưới dạng ArrayBuffer
            })
            .then(arrayBuffer => {
                return mammoth.extractRawText({ arrayBuffer }); // Lấy nội dung văn bản
            })
            .then(result => {
                setTextContent(result.value); // Lưu nội dung văn bản vào state
                setLoading(false); // Đặt loading thành false
            })
            .catch(err => {
                setError(err.message); // Lưu lỗi nếu có
                setLoading(false); // Đặt loading thành false
            });
    }, [data]);

    if (loading) {
        return <div>Loading...</div>; // Hiển thị khi đang tải
    }

    if (error) {
        return <div>Error: {error}</div>; // Hiển thị thông báo lỗi
    }

    return (
        <div className='h-[600px] w-full border border-gray-300 rounded-lg p-4 shadow overflow-auto'>
            <h2 className="font-bold">Content:</h2>
            <pre className="whitespace-pre-wrap">{textContent}</pre> {/* Hiển thị nội dung văn bản */}
        </div>
    );
}

export default WordViewer;
