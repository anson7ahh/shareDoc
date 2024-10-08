import BasicBreadcrumbs from '@/Components/BreadcrumdComponent';
import FooterLayout from '@/Layouts/FooterLayout';
import Navbar from "@/Layouts/NavLayout";
import PageLayout from '@/Layouts/PageLayout';
import { memo } from 'react';

const DocCate = ({ auth, AncestorsAndSelf, paginatedItems }) => {
    console.log('paginatedItems', paginatedItems?.original?.paginatedItems)
    const originalPaginatedItems = paginatedItems?.original?.paginatedItems;
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
            <div className='pt-[100px] mx-40 bg-gray-200'>
                <div>
                    <BasicBreadcrumbs AncestorsAndSelf={AncestorsAndSelf.original?.parentCategory} />
                </div>
                <div>
                    <PageLayout data={originalPaginatedItems} />
                </div>

            </div>
            <FooterLayout />
        </>
    );
}
export default memo(DocCate);
