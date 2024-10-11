import React, { memo, useEffect, useRef, useState } from 'react';

import Image from '@/Components/ImgComponent';
import axios from 'axios';

const Comment = ({ DocumentId, auth, comment }) => {
    const [content, setContent] = useState(''); // Lưu nội dung bình luận

    const contentRef = useRef();
    const handleCommentChange = (e) => {
        setContent(e.target.value);
    };
    const handleClick = async () => {
        try {
            // Lấy CSRF token trước khi gửi bình luận
            await axios.get('/sanctum/csrf-cookie', { withCredentials: true });

            // Gửi bình luận
            const response = await axios.post('/comment', {
                document_id: DocumentId,
                body: content,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // Đảm bảo session được gửi kèm
            });

            console.log('Bình luận đã được gửi:', response.data);
            setContent('');
        } catch (err) {
            console.error('Lỗi khi gửi bình luận:', err.response ? err.response.data : err);
        }
    };





    return (
        <div className="flex space-x-4 py-4">
            {/* Avatar */}
            <Image auth={auth.img} className="w-12 h-12 rounded-full bg-gray-300"></Image>

            {/* Comment Input */}
            <div className="flex flex-col w-full">
                <input
                    ref={contentRef}
                    className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    type="text"
                    placeholder="Viết bình luận..."
                    value={content}
                    onChange={handleCommentChange}
                />
                {/* Action buttons */}
                <div className="flex space-x-2 mt-2 justify-end">
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setContent('')} // Clear comment on cancel
                    >
                        Hủy
                    </button>
                    <button
                        className={`bg-blue-500 text-white px-4 py-2 rounded-full ${!content.trim() && 'opacity-50 cursor-not-allowed'}`}
                        onClick={handleClick}
                        disabled={!content.trim()} // Disable button if comment is empty
                    >
                        Bình luận
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(Comment);
