import React, { useState } from 'react';

const AdminPageItemsLayout = ({ data }) => {
    // const allUser = data?.user?.data;// Đảm bảo allUser là một mảng

    const allUser = data?.data;// Đảm bảo allUser là một mảng
    console.log('allUser', allUser)
    return (
        <div className="space-y-6">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-300 text-gray-800 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-center">ID</th>
                            <th className="py-3 px-6 text-center">Name</th>
                            <th className="py-3 px-6 text-center">Email</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm font-light">
                        {allUser && allUser.map((user) => (
                            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-center">{user.id}</td>
                                <td className="py-3 px-6 text-center">{user.name}</td>
                                <td className="py-3 px-6 text-center">{user.email}</td>
                                <td className="py-3 px-6 text-center flex justify-center space-x-2">
                                    <button
                                        onClick={() => setEditingUser(user)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPageItemsLayout;
