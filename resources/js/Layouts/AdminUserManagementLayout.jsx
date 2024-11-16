import { fetchUserManagement, setActiveSection, setShowDropdownDocument } from '@/redux/AdminDashboardSlice';
import { useDispatch, useSelector } from 'react-redux';

import AdminPageItemsLayout from './AdminPageItemsLayout';
import PaginationOutlined from '@/Components/PaginationComponent';
import React from 'react';
import { router } from '@inertiajs/react';

export default function AdminUserManagementLayout({ allUser }) {
    const { showUserManagement } = useSelector((state) => state.adminDashboard);
    const dispatch = useDispatch();
    const handlePageChange = (event, value) => {
        dispatch(setActiveSection('showUserManagement'));
        console.log('value', value);
        router.get(`${allUser?.path}?page=${value}`);
    };
    return (
        <>
            {
                showUserManagement && (<div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-center mb-4">Quản lý người dùng</h1>

                    <AdminPageItemsLayout data={allUser} />
                    <div>
                        <PaginationOutlined
                            count={allUser.last_page}
                            page={allUser.current_page}
                            onChange={handlePageChange}
                        />
                    </div>

                </div>)

            }

        </>


    );
}