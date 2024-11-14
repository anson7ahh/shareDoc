import ButtonDeleteComponent from '@/Components/ButtonDeleteComponent'
import ButtonViewDetailComponent from '@/Components/ButtonViewDetailComponent'
import formatCurrency from '@/Utils/index'
import { memo } from 'react';

const DocumentDownloadedLayout = ({ DocumentDownloaded }) => {


    return (
        <div className='pt-[100px] mx-20'>
            <h2 className='text-2xl font-semibold mb-4'>Danh sách tài liệu đã tải</h2>
            <div className='mb-4'>Số tài liệu đã tải: <span className='font-bold'>{DocumentDownloaded.length}</span></div>
            <div className='space-y-4'>
                {DocumentDownloaded.map(data => (
                    <div key={data.id} className='p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300 flex justify-between items-center'>
                        <div>
                            <h3 className='text-lg font-semibold'>{data.document.title}</h3>
                            <p className='text-sm text-gray-600'>{formatCurrency(data.document.point)}</p>
                            <p className='text-sm text-gray-600'>{new Date(data.document.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className='flex items-center'>
                            <ButtonViewDetailComponent documentId={data.document.id} />
                            <ButtonDeleteComponent documentId={data.document.id} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(DocumentDownloadedLayout);
