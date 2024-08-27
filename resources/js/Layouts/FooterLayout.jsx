import ApplicationLogo from "@/Components/ApplicationLogo"
import { Link } from "@inertiajs/react";

export default function FooterLayout() {
    return (
        <>
            <div className="flex items-center justify-between flex-col pt-10 bg-gray-50 gap-10 my-5">
                <div>
                    <Link href="/">
                        <ApplicationLogo className="h-10 w-auto fill-current text-gray-800 dark:text-white" />
                    </Link>
                </div>
                <div className="flex  items-center justify-between gap-4 mt-4">
                    <p className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white ">Tài liệu</p>
                    <p className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white ">Mục lục</p>
                    <p className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white ">Bài viết</p>
                    <p className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white ">Tìm kiếm mới</p>
                    <p className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white ">Luận văn</p>
                    <p className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white ">Tài liệu mới</p>
                    <p className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white ">Chủ đề tài liệu mới đăng</p>
                </div>

                <div className="flex flex-row justify-between items-start gap-10">
                    <div className="flex flex-col justify-between">
                        <p className="font-bold text-gray-700 uppercase hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Hỗ trợ khách hàng</p>

                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                </svg>
                                <p className="text-gray-700 text-sm hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">shareDocStudy@gmail.com</p>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                </svg>
                                <p className="text-gray-700 text-sm hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">shareDocStudy@gmail.com</p>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                </svg>
                                <p className="text-gray-700 text-sm hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">shareDocStudy@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between">
                        <p className="font-bold text-gray-700 uppercase hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Giúp đỡ</p>
                        <p className=" text-gray-700 text-sm hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Câu hỏi thường gặp</p>
                        <p className=" text-gray-700 text-sm hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Điều khoản sử dụng</p>
                        <p className=" text-gray-700 text-sm hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Quy định chính sách bán tài liệu</p>
                        <p className=" text-gray-700 text-sm hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Hướng dẫn thanh toán</p>
                    </div>
                    <div className="flex flex-col justify-between">
                        <p className="font-bold text-gray-700 uppercase hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Giới thiệu</p>
                        <p className=" text-gray-700 text-sm hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">share Doc Study là gì ?</p>
                    </div>
                </div>

            </div>

        </>
    )
}