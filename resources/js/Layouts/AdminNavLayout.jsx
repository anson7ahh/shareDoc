import "../../css/app.css";

import AdminAuthenticatedLayout from './AdminAuthenticatedLayout'
import React from "react";

export default function AdminNavLayout({ auth }) {

    return (
        <nav className="bg-white  flex items-center justify-end w-full border border-gray-200 fixed z-40">
            <div className="flex mr-20  ">
                <AdminAuthenticatedLayout auth={auth} className='p-6' />
            </div>
        </nav >
    );
}
