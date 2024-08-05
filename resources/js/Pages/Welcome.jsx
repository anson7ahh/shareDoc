import Navbar from "@/Layouts/NavLayout";

export default function Welcome({ auth }) {
    return (
        <>
            <div className="w-full bg-gray-100  ">
                <div className="relative ">
                    <Navbar auth={auth} showSearchBar showMenu showUpload />
                </div>
            </div>
        </>
    );
}
