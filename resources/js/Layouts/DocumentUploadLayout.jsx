import ButtonDeleteComponent from '@/Components/ButtonDeleteComponent'
import ButtonViewDetailComponent from '@/Components/ButtonViewDetailComponent'
import { memo } from 'react';

const DocumentUploadLayout = ({ DocumentUploaded }) => {

    return (
        <div className='pt-[100px] mx-20'>
            <h2 className='text-2xl font-semibold mb-4'>Danh sách tài liệu đã tải</h2>
            <div className='mb-4'>Số tài liệu đã tải lên: <span className='font-bold'>{DocumentUploaded.length}</span></div>
            <div className='space-y-4'>
                {DocumentUploaded.map(data => (
                    <div key={data.id} className='p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300 flex justify-between items-center'>
                        <div>
                            <h3 className='text-lg font-semibold'>{data.title || 'Chưa có tên'}</h3>

                            <p className='text-sm text-gray-600'>{new Date(data.created_at).toLocaleDateString()}</p>
                            <p className='text-sm text-gray-600'>{data.status != 'notreviewed' ? 'Tài liệu đã được kiểm duyệt' : 'Tài liệu chưa được kiểm duyệt'}</p>
                            <p className='text-sm text-gray-600'>{data?.deleted_at != null ? 'Tài liệu đang được kiểm duyệt dể xóa' : ''}</p>
                        </div>
                        <div className='flex items-center'>
                            <ButtonViewDetailComponent document={data} />
                            <ButtonDeleteComponent document={data} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default memo(DocumentUploadLayout);