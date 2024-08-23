import { memo, useEffect, useState } from "react";

import FormUploadFile from "@/Components/FormUploadFileComponent";
import Progress from "@/Components/Progress";
import axios from "axios";

function UploadComponent({ file }) {
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const source = axios.CancelToken.source();
        if (file !== null) {
            const formData = new FormData();
            formData.append('file', file);
            axios({
                url: "/upload/{file.name}",
                method: "post",
                data: formData,
                cancelToken: source.token,
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    let percentage = Math.floor((loaded * 100) / total);
                    setProgress(percentage);
                }
            })
                .then((response) => {
                    console.log('response', response);
                    setMessage('File uploaded successfully');
                })
                .catch((error) => {
                    if (axios.isCancel(error)) {
                        console.log("Request canceled", error.message);
                    } else {
                        console.log("Upload error", error);
                        setMessage('Error uploading file');
                    }
                });
        }
        return () => {
            source.cancel("Operation canceled by the user.");
        };
    }, [file]);
    return (
        <>
            <Progress progress={progress} >
                <div>{message}</div>
                <FormUploadFile />
            </Progress>
        </>
    );
}
export default memo(UploadComponent);