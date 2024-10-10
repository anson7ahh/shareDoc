import BasicBreadcrumbs from '@/Components/BreadcrumdComponent';
import FilePDF from '@/Layouts/FilePDFLayout'
import FooterLayout from '@/Layouts/FooterLayout';
import Navbar from "@/Layouts/NavLayout";
import { memo } from 'react';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();
const FileDetail = ({ auth, data }) => {

    const DocumentItems = data.original?.pageItems
    console.log(data)

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
            <main className='pt-[100px] mx-40'>
                <BasicBreadcrumbs AncestorsAndSelf={data.original?.parentCategory} />
                <div>
                    {DocumentItems.title}
                </div>
                <div>Luot tai:{DocumentItems.total_download}</div>
                <div>Luot xem:{DocumentItems.view}</div>
                <div>Giá:{DocumentItems.point === 0 ? 'Miễn phí' : DocumentItems.point}</div>
                <div className='bg-gray-200 p-4'>
                    <FilePDF data={DocumentItems} />
                </div>
            </main>
            <FooterLayout />
        </>
    )
}
export default memo(FileDetail);