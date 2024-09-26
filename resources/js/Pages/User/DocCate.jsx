import { memo, useEffect } from 'react';

import Navbar from "@/Layouts/NavLayout";

const DocCate = ({ auth, AncestorsAndSelf, getDocWithCate }) => {
    console.log('AncestorsAndSelf', AncestorsAndSelf)
    console.log('getDocWithCate', getDocWithCate)
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
export default memo(DocCate)