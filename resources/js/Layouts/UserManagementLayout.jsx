import React, { useState } from 'react';

import AdminPageItemsLayout from './AdminPageItemsLayout';
import PaginationOutlined from '@/Components/PaginationComponent';

export default function UserManagement({ data }) {

    const handlePageChange = (event, value) => {
        console.log('value', value)
        window.location.href = `${data?.path}?page=${value}`;
    };
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-center mb-4">Quản lý người dùng</h1>

            <AdminPageItemsLayout data={data} />
            <div>
                <PaginationOutlined
                    count={data.last_page}
                    page={data.current_page}
                    onChange={handlePageChange}
                />
            </div>

        </div>
    );
}
