import { memo, useEffect } from 'react';

import BasicBreadcrumbs from '@/Components/BreadcrumdComponent';
import CommentLayout from '@/Layouts/CommentLayout';
import FilePDF from '@/Layouts/FilePDFLayout';
import FooterLayout from '@/Layouts/FooterLayout';
import Navbar from "@/Layouts/NavLayout";
import formatCurrency from '@/Utils/index.js'
import { pdfjs } from 'react-pdf';
import { setAllComment } from '@/redux/CommentSlice';
import { useDispatch } from 'react-redux';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();



const FileDetail = ({ auth, data, comment }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if (comment) {
            dispatch(setAllComment(comment));
        }
    }, [comment]);
    const DocumentItems = data.original?.pageItems;
    console.log('DocumentItems', DocumentItems)
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
                    <p className='text-gray-600'>Giá: {DocumentItems.point === 0 ? 'Miễn phí' : formatCurrency(DocumentItems.point)}</p>
                </div>

                <div className='bg-gray-200 p-4 rounded-lg shadow-md'>
                    <FilePDF data={DocumentItems} auth={auth} />
                </div>

                <div className='w-full pt-5 flex flex-col space-y-4'>
                    {/* Phần bình luận */}
                    <div>
                        <p className="text-xl font-semibold text-gray-800">Bình luận</p>
                    </div>
                    <div>
                        <CommentLayout auth={auth?.user} DocumentId={DocumentItems?.id} />
                    </div>
                </div>
            </main>

            <FooterLayout />
        </>
    )
}

export default memo(FileDetail);
