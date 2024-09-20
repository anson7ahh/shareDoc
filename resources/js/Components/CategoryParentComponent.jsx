import { memo, useCallback, useEffect, useState } from "react";

import CategoryChildren from './CategoryChildrenComponent'

function CategoryParent({ }) {
    const [categoryParentId, setCategoryParentId] = useState('');
    const [categoriesParent, setCategoriesParent] = useState([]);

    useEffect(() => {
        const storedCategories = localStorage.getItem('categoriesParent');
        if (storedCategories) {
            setCategoriesParent(JSON.parse(storedCategories));
            console.log('storedCategories', storedCategories)
        }
    }, []);

    const handleChangeCategoryParent = useCallback((e) => {
        const categoryParentId = e.target.value
        setCategoryParentId(categoryParentId);
    }, [categoryParentId]);
    return (
        <>
            <label htmlFor="categoryParent" className="block text-lg font-mono text-gray-700 mb-1">
                Chọn danh mục
                <span className="text-red-500">*</span>
            </label>
            {categoriesParent && (
                <select
                    className="border border-gray-300 p-2 rounded"
                    placeholder="Chọn danh mục"
                    id="categoryParent"
                    onChange={handleChangeCategoryParent}
                    value={categoryParentId}
                >
                    <option value="">Chọn danh mục</option>
                    {categoriesParent.map((categoryParent) => (
                        <option key={categoryParent.id} value={categoryParent.id}>
                            {categoryParent.name}
                        </option>
                    ))}
                </select>
            )}
            {categoryParentId && (
                <CategoryChildren categoryParentId={categoryParentId} />
            )}

        </>
    );
}
export default memo(CategoryParent);