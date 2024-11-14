import { useDispatch, useSelector } from 'react-redux';

import AdminAsideLayout from '@/Layouts/AdminAsideLayout'
import AdminNavLayout from '@/Layouts/AdminNavLayout'
import UserManagementLayout from '@/Layouts/UserManagementLayout';

export default function UserManagement({ auth, allUser }) {
    console.log('dashboard', allUser)
    const { showOverview, showUserManagement, showSettings, showCategoryManagement,
        showDropdownDocument, showDocumentNeedDelete, showDocumentNeedReview } = useSelector((state) => state.adminDashboard);
    return (
        <>
            <div className="flex">
                <AdminAsideLayout />
                <AdminNavLayout auth={auth} />
                <div className="flex-1 ml-[250px] mt-[100px]">
                    {showUserManagement && (
                        <UserManagementLayout data={allUser} />

                    )}

                </div>

            </div>

        </>
    );
}