import { createContext, memo, useEffect, useState } from "react";

import Progress from "@/Components/Progress";
import axios from "axios";

export const TitleContext = createContext();
function UploadComponent({ file }) {
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [documentId, setDocumentId] = useState('')

    useEffect(() => {
        const source = axios.CancelToken.source();
        if (!file) return;
        setTitle(file.name);
        let formData = new FormData();
        formData.append('file', file);
        console.log('formdata212', formData);
        axios({
            url: "/upload",
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
                console.log('response file', response.data);
                setMessage(response.data);
                setDocumentId(response.data.documentId)
            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                    console.log("Request canceled", error.message);
                } else {
                    console.log("Upload error", error);
                    setMessage('Error uploading file');
                }
            });


    }, [file]);
    return (
        <>
            <TitleContext.Provider value={title}>
                <Progress progress={progress} title={title} data={message} id={documentId} />
            </TitleContext.Provider>
        </>
    );
}
export default memo(UploadComponent);