import { Link } from "@inertiajs/react";
import axios from "axios";
import formatCurrency from '@/Utils/index';
import { memo } from "react";

function ButtonDownloadComponent({ document, auth }) {
    console.log(document.documents_id);
    console.log(document);
    console.log(auth);

    const handleClick = async () => {
        try {
            // Kiểm tra xem người dùng đã đăng nhập hay chưa

            // Nếu point > 0, hiện cửa sổ xác nhận
            if (Number(document.point) > 0) {
                const confirmed = window.confirm(`Tài liệu có giá ${formatCurrency(document.point)}. Bạn chắc chắn không?`);
                if (!confirmed) {
                    console.log("Người dùng đã hủy!");
                    return;
                }
            }
            const response = await axios.post('/download', {
                document_id: document.documents_id,
                document_point: document.point,
            });

            console.log("API call thành công!", response.data);
            alert(response.data.message || "Download created successfully.");
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert("An unexpected error occurred.");
            }
        }
    };

    return (
        <>
            {
                auth?.user ? (
                    <button
                        onClick={handleClick}
                        className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-all ease-in-out duration-300 w-full text-center font-semibold shadow-md focus:ring-2 focus:ring-green-300"
                    >
                        Tải xuống
                    </button>
                ) : (
                    <Link
                        href="/login"
                        className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-all ease-in-out duration-300 w-full text-center font-semibold shadow-md focus:ring-2 focus:ring-green-300"
                    >
                        Tải xuống
                    </Link>
                )
            }
        </>
    );
}

export default memo(ButtonDownloadComponent);
