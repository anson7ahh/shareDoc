import Navbar from "@/Layouts/NavLayout";
import UploadLayout from "@/Layouts/UploadLayout";
import { createContext } from "react";

export const CategoriesParentContext = createContext([])

export default function Upload({ auth, categoriesParent }) {
    console.log(typeof (categoriesParent))
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
