import { useEffect, useState } from "react";

import Dropdown from "@/Components/Dropdown";
import Image from '@/Components/ImgComponent'
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import formatCurrency from '@/Utils/index'

export default function Authenticated({ className = "", user }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const [totalPoint, setTotalPoint] = useState(user?.total_points)

    useEffect(() => {
        setTotalPoint(user?.total_points)
    }, [user?.total_points])

    return (
        <div className={"bg-white" + className}>
            <Dropdown>
                <Dropdown.Trigger >
                    <span className="inline-flex rounded-md">
                        <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                        >
                            <Image auth={user.img} className="w-8 h-8 rounded-full mr-2" />


                            {user.name} {formatCurrency(totalPoint)}

                        </button>
                    </span>
                </Dropdown.Trigger>
                <Dropdown.Content contentClasses='absolute z-50 w-48 bg-white rounded-md ring-1 ring-black ring-opacity-5 ' align="left" width='48'  >
                    <Dropdown.Link href={route("profile.edit")}>
                        Hồ sơ
                    </Dropdown.Link>
                    <Dropdown.Link
                        href={route('collection.index')}
                        method="get"
                        as="button"
                    >
                        Bộ sưu tập
                    </Dropdown.Link>
                    <Dropdown.Link
                        href={route("logout")}
                        method="post"
                        as="button"
                    >
                        Đăng xuất
                    </Dropdown.Link>
                </Dropdown.Content>
            </Dropdown>

            <div className="-me-2 flex items-center sm:hidden">
                <button
                    onClick={() =>
                        setShowingNavigationDropdown(
                            (previousState) => !previousState
                        )
                    }
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                >
                    <svg
                        className="h-6 w-6"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            className={
                                !showingNavigationDropdown
                                    ? "inline-flex"
                                    : "hidden"
                            }
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                        <path
                            className={
                                showingNavigationDropdown
                                    ? "inline-flex"
                                    : "hidden"
                            }
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            <div
                className={
                    (showingNavigationDropdown ? "block" : "hidden") +
                    " sm:hidden"
                }
            >
                <div className="pt-4 pb-1 border-t border-gray-200">
                    <div className="px-4">

                        <div className="font-medium text-base text-gray-800">
                            {user.name}
                        </div>
                        <div className="font-medium text-sm text-gray-500">
                            {user.email}
                        </div>
                    </div>
                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink href={route("profile.edit")}>
                            Profile
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            method="post"
                            href={route("logout")}
                            as="button"
                        >
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </div >
    );
}
