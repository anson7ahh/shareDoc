import "../../css/app.css";

import ApplicationLogo from "@/Components/ApplicationLogo";
import Authenticated from "./AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import React from "react";
import Upload from "./UploadLayout";

export default function Navbar({
    auth,
    showSearchBar = true,
    showMenu = true,
    showUpload = true,
}) {
    return (
        <nav className="bg-white border-red-200 h-[100px] w-full">
            <div className=" mx-auto px-4 py-2 flex items-center justify-center">
                {/* Logo */}
                <div className="flex items-center">
                    <Link to="/">
                        <ApplicationLogo className="h-10 w-auto fill-current text-gray-800 dark:text-white" />
                    </Link>
                </div>
                <div className="">
                    <div className={showSearchBar ? "" : "invisible"}>
                        <input
                            type="text"
                            className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300"
                            placeholder="Search..."
                        />
                    </div>
                </div>
                <div>
                    <div className={showUpload ? "" : "invisible"}>
                        <Upload user={auth} />
                    </div>
                </div>
                <div>
                    {auth ? (
                        <Authenticated user={auth} />
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
            </div>
        </nav>
    );
}
