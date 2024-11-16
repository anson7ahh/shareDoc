import { useDispatch, useSelector } from 'react-redux';

import AdminAsideLayout from '@/Layouts/AdminAsideLayout'
import AdminNavLayout from '@/Layouts/AdminNavLayout'
import axios from 'axios';

export default function Dashboard({ auth }) {

    const { showOverview } = useSelector((state) => state.adminDashboard);


    return (
        <>
            <div className="flex">
                <AdminAsideLayout />
                <AdminNavLayout auth={auth} />
                <div className="flex-1 ml-[250px] mt-[100px]">

                </div>
            </div>

        </>
    );
}
