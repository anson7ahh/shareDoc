import { setActiveSection, setShowDropdownDocument } from '@/redux/AdminDashboardSlice';
import { useDispatch, useSelector } from 'react-redux';

import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function AdminAsideLayout() {
    const dispatch = useDispatch();
    const { showOverview, showUserManagement, showSettings, showCategoryManagement,
        showDropdownDocument, showDocumentNeedDelete, showDocumentNeedReview } =
        useSelector((state) => state.adminDashboard);
    const handleShowOverview = () => {
        dispatch(setActiveSection('showOverview'));
    };
    const handleShowUserManagement = () => {
        dispatch(setActiveSection('showUserManagement'));
    };
    const handleShowSettings = () => {
        dispatch(setActiveSection('showSettings'));
    };
    const handleShowCategoryManagement = () => {
        dispatch(setActiveSection('showCategoryManagement'));
    };
    const handleShowDropdownDocument = () => {
        dispatch(setShowDropdownDocument(true));
    }

    const handleShowDocumentNeedReview = () => {
        dispatch(setActiveSection('showDocumentNeedReview'));
    }
    const handleShowDocumentNeedDelete = () => {
        dispatch(setActiveSection('showDocumentNeedDelete'));
    }


    return (
        <aside className="fixed z-50 w-[250px] h-full bg-gray-800 text-white flex flex-col justify-start py-6 px-4 shadow-lg">
            <div className="flex items-center justify-center mb-8">
                <Link href="/">
                    <ApplicationLogo className="h-10 w-auto fill-current text-white" />
                </Link>
            </div>

            <div className="flex flex-col space-y-4">
                <div
                    onClick={handleShowOverview}
                    className={` cursor-pointer text-lg font-medium hover:bg-gray-700 py-2 px-4 rounded-lg transition duration-300
                    ${showOverview ? 'bg-gray-700' : ''}`}
                >
                    Tổng quan
                </div>
                <div
                    onClick={handleShowUserManagement}
                    className={` cursor-pointer text-lg font-medium hover:bg-gray-700 py-2 px-4 rounded-lg transition duration-300
                     ${showUserManagement ? 'bg-gray-700' : ''}`}
                >
                    Quản lý người dùng
                </div>


                <button
                    onClick={handleShowDropdownDocument}
                    className={`w-full text-left cursor-pointer  text-lg font-medium hover:bg-gray-700 py-2 px-4 rounded-lg transition duration-300`}
                >
                    Quản lý tài liệu tải lên
                </button>

                {showDropdownDocument && (
                    <div className=" text-white text-lg ring-1 my-2 ring-opacity-5 rounded-lg shadow-lg ring-white space-y-2 ">
                        <div
                            onClick={handleShowDocumentNeedReview}

                            className={`cursor-pointer font-medium hover:bg-gray-700 py-2 px-4 rounded-lg transition duration-300 ${showDocumentNeedReview ? 'bg-gray-700' : ''}`}
                        >
                            Tài liệu xét duyệt
                        </div>
                        <div
                            onClick={handleShowDocumentNeedDelete}

                            className={`cursor-pointer font-medium hover:bg-gray-700 py-2 px-4 rounded-lg transition duration-300 ${showDocumentNeedDelete ? 'bg-gray-700' : ''}`}
                        >
                            Tài liệu cần xóa
                        </div>
                    </div>
                )}
                <div
                    onClick={handleShowCategoryManagement}
                    className={` cursor-pointer text-lg font-medium hover:bg-gray-700  py-2 px-4 rounded-lg transition duration-300
                    ${showCategoryManagement ? 'bg-gray-700' : ''}`}
                >
                    Quản lý thể loại
                </div>
                <div
                    onClick={handleShowSettings}
                    className={`cursor-pointer text-lg font-medium hover:bg-gray-700 py-2 px-4 rounded-lg transition duration-300
                    ${showSettings ? 'bg-gray-700' : ''}`}
                >
                    Cài đặt
                </div>
            </div>
        </aside >
    );
}
