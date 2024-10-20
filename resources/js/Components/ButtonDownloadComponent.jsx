import { memo, useEffect, useState } from "react";

import { Link } from "@inertiajs/react";
import axios from "axios";
import formatCurrency from '@/Utils/index'

function ButtonDownloadComponent({ document, auth }) {
    console.log((document.documents_id))
    console.log((document.point))
    console.log(auth.user.total_points)
    const handleClick = async () => {
        if (Number(document.point) > 0) {
            const confirmed = window.confirm(`Tài liệu có giá ${formatCurrency(document.point)} . Bạn chắc chắn không?`);
            if (confirmed) {
                try {
                    const response = await axios.post('/download', {
                        document_id: document.documents_id,
                        document_point: document.point,
                    });
                    console.log("API call thành công!", response.data);
                } catch (error) {
                    console.error("API call thất bại!", error);
                }
            } else {
                console.log("Người dùng đã hủy!");
            }
        } else {
            const response = await axios.post('/download', {
                document_id: document.documents_id,
                point: document.point,
            });
            console.log("API call thành công!", response.data);

        }
    };

    return (
        <>
            {
                auth ? (
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
