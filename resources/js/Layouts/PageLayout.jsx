import PaginationOutlined from '@/Components/PaginationComponent';
import { memo } from 'react';

const PageLayout = ({ data }) => {
    const entriesArray = Object.entries(data?.data);
    const handlePageChange = (event, value) => {
        window.location.href = `${data?.path}?page=${value}`;
    };

    return (
        <>
            <div className='w-auto h-auto bg-red-300'>
                {entriesArray.map(([key, data]) => (
                    <div key={key}>
                        <h1>{data.title}</h1>
                    </div>
                ))}
            </div>
            <div>
                <PaginationOutlined
                    count={data.last_page}
                    page={data.current_page}
                    onChange={handlePageChange}
                />
            </div>
        </>
    )

}
export default memo(PageLayout);