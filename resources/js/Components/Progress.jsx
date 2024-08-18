import { useEffect, useState } from "react";

import axios from "axios";

export default function Progress({ file }) {
    console.log('asda', file);
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const source = axios.CancelToken.source();
        if (file !== null) {
            axios({
                url: "/upload/{file.name}",
                method: "post",
                data: file,
                cancelToken: source.token,
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    let precentage = Math.floor((loaded * 100) / total);
                    setProgress(precentage)
                }
            })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    if (axios.isCancel(error)) {
                        console.log("Request canceled", error.message);
                    } else {
                        console.log("Upload error", error);
                    }
                });
        }
        return () => {
            source.cancel("Operation canceled by the user.");
        };
    }, [file]);
    return (
        <>
            {
                progress > 0 && (
                    <div className="mt-4  w-full flex flex-row">
                        <div className="bg-gray-200 rounded-full h-4 w-full">
                            <div
                                className="bg-blue-500 h-full w-full rounded-full"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <div className="ml-5 text-sm text-gray-700">
                            {progress}%
                        </div>
                    </div>
                )
            }
        </>
    )
}