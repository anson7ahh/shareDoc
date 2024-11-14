import React, { useState } from 'react';

const AdminPageItemsLayout = ({ data }) => {
    const [allUser, setAllUser] = useState(data?.data);
    console.log('allUser', allUser)
    allUser.flatMap((user) => { console.log(user) })
    // const [newUser, setNewUser] = useState({ name: '', email: '' });
    const [editingUser, setEditingUser] = useState(null);
    const handleEditUser = () => {
        setAllUser(
            allUser.map(user => (user.id === editingUser.id ? editingUser : user))
        );
        setEditingUser(null);
    };

    // Xóa người dùng
    const handleDeleteUser = (id) => {
        setAllUser(allUser.filter(user => user.id !== id));
    };
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
                        {allUser.flatMap((user) => (
                            <tr key={user?.id} className="border-b border-gray-200 hover:bg-gray-100 text-center">
                                {editingUser && editingUser.id === user.id ? (
                                    <>
                                        <td className="py-3 px-6">{user.id}</td>
                                        <td className="py-3 px-6">
                                            <input
                                                type="text"
                                                value={editingUser.name}
                                                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                                className="border p-2 rounded w-full"
                                            />
                                        </td>
                                        <td className="py-3 px-6">
                                            <input
                                                type="email"
                                                value={editingUser.email}
                                                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                                className="border p-2 rounded w-full"
                                            />
                                        </td>
                                        <td className="py-3 px-6">
                                            <button onClick={handleEditUser} className="bg-green-500 text-white px-4 py-2 rounded">
                                                Lưu
                                            </button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="py-3 px-6">{user.id}</td>
                                        <td className="py-3 px-6">{user.name}</td>
                                        <td className="py-3 px-6">{user.email}</td>
                                        <td className="py-3 px-6 flex justify-center space-x-2">
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
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPageItemsLayout;
