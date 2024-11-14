import axios from "axios";
import { memo } from "react";

function ButtonDeleteComponent({ document }) {
    const handleClick = async () => {
        try {
            const response = await axios.delete(`/collection/${document?.id}`);
            console.log('Dữ liệu nhận được:', response.data);
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
        }
    };

    return (
        <>

            <button
                onClick={handleClick}
                className={`ml-4 px-3 py-1 border  rounded-lg border-red-600 ${document?.deleted_at === null
                    ? 'text-red-600  hover:bg-red-600 hover:text-white transition duration-300'
                    : 'text-gray-500 cursor-not-allowed'
                    }`}
                disabled={document?.deleted_at !== null}
            >
                Xóa
            </button>

        </>
    );
}

export default memo(ButtonDeleteComponent);