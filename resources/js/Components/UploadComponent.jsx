import { Link } from "@inertiajs/react";

export default function Upload({ className = "", auth }) {
    return (
        <>
            <div className={"flex bg-blue-300 px-4 py-1 " + className}>
                {auth ? (
                    <Link href="/upload">Tải lên</Link>
                ) : (
                    <Link href="/login">Tải lên</Link>
                )}
            </div>
        </>
    );
}
