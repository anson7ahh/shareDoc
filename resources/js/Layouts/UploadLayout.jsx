import { Link } from "@inertiajs/react";

export default function Upload({ user }) {
    return (
        <>
            {user ? (
                <div className="flex bg-blue-300 px-4 py-1">
                    <Link href="/upload">Tải lên</Link>
                </div>
            ) : (
                <div className=" flex bg-blue-300 px-4 py-1 ">
                    <Link href="/login">Tải lên</Link>
                </div>
            )}
        </>
    );
}
