import { memo, useEffect } from 'react';

import Navbar from "@/Layouts/NavLayout";
import UploadLayout from "@/Layouts/UploadLayout";

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

        </>
    );
}
export default memo(Upload)