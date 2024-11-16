import React, { useState } from 'react';

import AdminAsideLayout from '@/Layouts/AdminAsideLayout'
import AdminNavLayout from '@/Layouts/AdminNavLayout'
import AdminUserManagementLayout from '@/Layouts/AdminUserManagementLayout';

export default function UserManagement({ auth, allUser }) {

    return (
        <div className="flex">
            <AdminAsideLayout />
            <AdminNavLayout auth={auth} />
            <div className="flex-1 ml-[250px] mt-[100px]">
                <div className="space-y-6">
                    <AdminUserManagementLayout allUser={allUser} />
                </div>
            </div>
        </div>


    );
}