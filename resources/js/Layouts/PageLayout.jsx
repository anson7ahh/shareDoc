import PageItems from './PageItemsLayout';
import PaginationOutlined from '@/Components/PaginationComponent';
import { memo } from 'react';

const PageLayout = ({ data }) => {
    const entriesArray = Object.entries(data?.data);
    const handlePageChange = (event, value) => {
        window.location.href = `${data?.path}?page=${value}`;
    };

    return (
        <>
            <div className="w-auto h-auto bg-gray-300">
                <PageItems items={entriesArray} />
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