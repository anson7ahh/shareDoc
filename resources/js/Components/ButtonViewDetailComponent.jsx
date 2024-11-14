import axios from "axios";
import { memo } from "react";

function ButtonViewDetailComponent({ document }) {

    const handleClick = async () => {
        try {
            const response = await axios.get('/collection/{documentId}');
            console.log('Dữ liệu nhận được:', response.data);
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
        }
    };
    return (
        <>
            <button
                onClick={() => handleClick(documentId)} // Gọi hàm xem chi tiết với ID tài liệu
                className='ml-4 px-3 py-1 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300'
            >
                Xem Chi Tiết
            </button>
        </>
    );
}

export default memo(ButtonViewDetailComponent);
