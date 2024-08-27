import { React, createContext, memo } from 'react';

import Navbar from "@/Layouts/NavLayout";
import UploadLayout from "@/Layouts/UploadLayout";

export const CategoriesParentContext = createContext();



const Upload = ({ auth, categoriesParent }) => {
    console.log(categoriesParent)
    return (
        <>
            <Navbar
                auth={auth}
                showSearchBar={false}
                showMenu={false}
                showUpload={false}
            />
            <CategoriesParentContext.Provider value={categoriesParent}>
                <UploadLayout />
            </CategoriesParentContext.Provider>
        </>
    );
}
export default memo(Upload)