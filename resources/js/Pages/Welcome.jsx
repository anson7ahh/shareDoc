import { Head, Link } from "@inertiajs/react";

import Navbar from "@/Layouts/NavLayout";

export default function Welcome({ auth }) {
    return (
        <>
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="sm:fixed sm:top-0 sm:right-0  text-end">
                    <Navbar
                        auth={auth.user}
                        showSearchBar
                        showMenu
                        showUpload
                    ></Navbar>
                </div>
            </div>
        </>
    );
}
