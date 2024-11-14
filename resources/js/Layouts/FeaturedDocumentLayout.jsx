import { Link } from '@inertiajs/react';

const FeaturedDocumentLayout = ({ items }) => {
    return (
        <>
            <div className='m-20'>
                <div className="text-2xl font-bold mb-4">Tài liệu nổi bật trong tuần</div>
                <div className="grid grid-cols-4 gap-4 p-4">
                    {items.map((document) => (
                        <Link key={document.id} href={`/document/${document.id}/${document.slug}.${document.format}`}>
                            <div className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-lg h-[300px]">
                                {document.format === 'pdf' ? (
                                    <img className="w-1/2 h-auto mb-2 object-contain" src="/storage/img/pdf.jpeg" alt="PDF" loading="lazy" />
                                ) : (
                                    <img className="w-1/2 h-auto mb-2 object-contain" src="/storage/img/dox.jpeg" alt="DOC" loading="lazy" />
                                )}
                                <span className="text-base font-medium"> {document.title}</span>
                                <span className="text-sm text-gray-600">Lượt xem: {document.view}</span>
                                <span className="text-sm text-gray-600">Lượt tải: {document.total_download}</span>
                                <span className="text-sm text-gray-600">Tác giả: {document.user.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default FeaturedDocumentLayout;
