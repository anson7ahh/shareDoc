import { memo, useState } from 'react';

import AsideComponent from '@/Components/AsideComponent';
import DocumentDownloadedLayout from '@/Layouts/DocumentDownloadedLayout';
import DocumentUploadLayout from '@/Layouts/DocumentUploadLayout';
import Navbar from "@/Layouts/NavLayout";

const Collection = ({ auth, DocumentDownloaded, DocumentUploaded }) => {
    const [showDownloaded, setShowDownloaded] = useState(true);
    const [showUploaded, setShowUploaded] = useState(false);

    const show = (newState) => {
        setShowDownloaded(newState);
        setShowUploaded(!newState);

    };

    return (
        <div className="h-screen flex flex-col">
            <Navbar
                auth={auth}
                showSearchBar={false}
                showMenu={false}
                showUpload={false}
            />

            <div className="flex flex-1 overflow-hidden">
                <AsideComponent show={show} showDownloaded={showDownloaded} />

                <main className="flex-1 p-6 overflow-auto">
                    {showDownloaded && <DocumentDownloadedLayout DocumentDownloaded={DocumentDownloaded} />}
                    {showUploaded && <DocumentUploadLayout DocumentUploaded={DocumentUploaded} />}
                </main>
            </div>
        </div>
    );
};

export default memo(Collection);
