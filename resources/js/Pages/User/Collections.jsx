import Navbar from "@/Layouts/NavLayout";
import { memo } from 'react';

const Collection = ({ auth, downloaded }) => {
    console.log('downloaded', downloaded)
    return (
        <>
            <Navbar
                auth={auth}
                showSearchBar={false}
                showMenu={false}
                showUpload={false}
            />


        </>
    );
}
export default memo(Collection)