import ApplicationLogo from "@/Components/ApplicationLogo"
import { Link } from "@inertiajs/react";

export default function FooterLayout() {
    return (
        <>
            <div className="flex items-center justify-between flex-col mt-10 bg-gray-200 ">
                <div>
                    <Link to="/">
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
            </div>

        </>
    )
}