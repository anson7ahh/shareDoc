import { Link } from '@inertiajs/react';

const PageItems = ({ items }) => {
    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            {items.map(([key, data]) => (

                <Link key={key} href={`/document/${data.id}/${data.slug}.${data.format}`}>
                    <div key={key} className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-lg h-[300px]">
                        {data.format === 'pdf' ? (
                            <img className="w-3/4 h-auto mb-2 object-contain" src="/storage/img/pdf.jpeg" alt="PDF" loading="lazy" />
                        ) : (
                            <img className="w-3/4 h-auto mb-2 object-contain" src="/storage/img/dox.jpeg" alt="DOC" loading="lazy" />
                        )}
                        <span className="text-base font-medium"> {data.title}</span>
                        <span className="text-sm text-gray-600">Lượt xem: {data.view}</span>
                        <span className="text-sm text-gray-600">Lượt tải: {data.total_download}</span>
                        <span className="text-sm text-gray-600">Tác giả: {data.name}</span>
                    </div>
                </Link>
            ))}
        </div>
    )
}
export default PageItems;