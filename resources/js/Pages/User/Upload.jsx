import Navbar from "@/Layouts/NavLayout";
import UploadLayout from "@/Layouts/UploadLayout";
export default function Upload({ auth }) {
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
