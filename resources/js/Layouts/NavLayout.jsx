import "../../css/app.css";

import ApplicationLogo from "@/Components/ApplicationLogo";
import Authenticated from "./AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import MenuButton from "./ButtonMenuLayout";
import React from "react";
import UploadButton from "@/Components/ButtonUploadComponent";

export default function Navbar({
    auth,
    showSearchBar = true,
    showMenu = true,
    showUpload = true,
}) {
    return (
        <nav className="bg-white  h-[100px] w-full border border-gray-200 fixed z-50">
            <div className="flex items-center justify-center mx-auto px-4 py-6  gap-5 w-full ">
                {/* Logo */}

                <Link href="/">
                    <ApplicationLogo className="h-10 w-auto fill-current text-gray-800 dark:text-white" />
                </Link>

                {/* end show logo */}

                {/* showmenu */}

                <div className={showMenu ? "" : "invisible"}><MenuButton /></div>

                {/* end show menu */}



                <div className={showSearchBar ? "" : "invisible"}>
                    <input
                        type="text"
                        className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300"
                        placeholder="Search..."
                    />
                </div>


                <div className={showUpload ? "" : "invisible"}>
                    <UploadButton auth={auth.user} />
                </div>


                {auth.user ? (
                    <Authenticated
                        className={"flex items-center"}
                        user={auth.user}
                    />
                ) : (
                    <>
                        <Link
                            href={route("login")}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Log in
                        </Link>
                        <Link
                            href={route("register")}
                            className="ms-4  font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Register
                        </Link>
                    </>
                )}

            </div>
        </nav>
    );
}
