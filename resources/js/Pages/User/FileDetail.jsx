import { memo, useState } from 'react';

import BasicBreadcrumbs from '@/Components/BreadcrumdComponent';
import Comment from '@/Layouts/CommentLayout';
import FilePDF from '@/Layouts/FilePDFLayout';
import FooterLayout from '@/Layouts/FooterLayout';
import Image from '@/Components/ImgComponent';
import Navbar from "@/Layouts/NavLayout";
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const FileDetail = ({ auth, data, comment }) => {
    const [showReplyComment, setShowReplyComment] = useState('false')

    const DocumentItems = data.original?.pageItems;

    const handleOnclick = ({ }) => {
        setShowReplyComment(!showReplyComment)
    }

    return (
        <>
            <header>
                <Navbar
                    auth={auth}
                    showSearchBar={false}
                    showMenu={false}
                    showUpload={false}
                />
            </header>
            <main className='pt-[100px] mx-auto max-w-4xl'>
                <BasicBreadcrumbs AncestorsAndSelf={data.original?.parentCategory} />

                <div className='my-6'>
                    <h2 className='text-2xl font-bold text-gray-900'>{DocumentItems.title}</h2>
                    <p className='text-gray-600'>Lượt tải: {DocumentItems.total_download}</p>
                    <p className='text-gray-600'>Lượt xem: {DocumentItems.view}</p>
                    <p className='text-gray-600'>Giá: {DocumentItems.point === 0 ? 'Miễn phí' : DocumentItems.point}</p>
                </div>

                <div className='bg-gray-200 p-4 rounded-lg shadow-md'>
                    <FilePDF data={DocumentItems} />
                </div>

                <div className='w-full pt-5 flex flex-col space-y-4'>
                    {/* Phần bình luận */}
                    <div>
                        <p className="text-xl font-semibold text-gray-800">Bình luận</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <Comment DocumentId={DocumentItems?.id} auth={auth?.user} comment={comment} />
                    </div>

                    <div className="space-y-4">
                        {comment.length > 0 && (
                            comment.map(comment => (
                                <div key={comment.comment_id} className="p-4 border border-gray-300 rounded-lg bg-white shadow-md transition-transform transform">
                                    <div className="flex items-center mb-3">
                                        <Image
                                            src={comment?.img}

                                            className="w-12 h-12 rounded-full mr-4 shadow-sm"
                                        />
                                        <div>
                                            <span className="font-semibold text-gray-800">{comment.name}</span>
                                            <span className="text-sm text-gray-500 block">{new Date(comment.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="bg-gray-100 p-3 rounded-md">
                                        <p className="text-gray-800">{comment.body}</p>
                                    </div>
                                    <div className="mt-3 text-right">
                                        <button onClick={handleOnclick} className="text-blue-500 hover:underline focus:outline-none">Trả lời</button>
                                    </div>
                                    <div>
                                        {showReplyComment != false && <div>
                                            showReplyCommentLayo
                                        </div>}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>

            <FooterLayout />
        </>
    )
}

export default memo(FileDetail);
