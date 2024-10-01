import FooterLayout from '@/Layouts/FooterLayout';
import Navbar from "@/Layouts/NavLayout";
import UploadLayout from "@/Layouts/UploadLayout";
import { memo } from 'react';

const Upload = ({ auth }) => {

    return (
        <>
            <Navbar
                auth={auth}
                showSearchBar={false}
                showMenu={false}
                showUpload={false}
            />

            <UploadLayout />
            <FooterLayout />
        </>
    );
}
export default memo(Upload)