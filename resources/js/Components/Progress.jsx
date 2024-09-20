import FormUploadFile from '@/Layouts/FormUploadFileLayout';
import React from 'react';

const Progress = ({ progress, status, message }) => {

    return (
        <>
            {progress > 0 && (
                <div className="mt-4 w-full flex flex-row">
                    <div className="bg-gray-200 rounded-full h-4 w-full">
                        <div
                            className="bg-blue-500 h-full rounded-full"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div className="ml-5 text-sm text-gray-700">
                        {progress}%
                    </div>
                </div>
            )}

            {progress === 100 && (
                <>
                    <p>{message}</p>
                    {status == 'success' && (
                        <FormUploadFile />
                    )}
                </>
            )}
        </>
    );
};

export default Progress;
