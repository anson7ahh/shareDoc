import { memo, useCallback, useEffect, useState } from "react";

import axios from "axios";
import { setCategoryId } from '@/redux/FileSlice';
import { useDispatch } from 'react-redux';

function CategoryChildren({ categoryParentId }) {
    const dispatch = useDispatch();
    const [categoryChildren, setCategoryChildren] = useState([]);
    const [categoryChildId, setCategoryChildId] = useState(null);

    useEffect(() => {
        if (categoryParentId) {
            setCategoryChildren([]);
            setCategoryChildId(null);
            const fetchCategoryChildren = async () => {
                try {
                    const response = await axios.get(`upload/${categoryParentId}`);
                    setCategoryChildren(response.data.categoryChildren);
                } catch (error) {
                    setCategoryChildren([]);
                }
            };
            fetchCategoryChildren();
        } else {
            setCategoryChildren([]);
            setCategoryChildId(null);
        }
    }, [categoryParentId]);

    const handleChangeCategoryChild = useCallback((e) => {
        const selectedCategoryChild = e.target.value;
        setCategoryChildId(selectedCategoryChild);
        dispatch(setCategoryId(selectedCategoryChild))
    }, []);

    return (
        <>
            {categoryParentId && (
                <select
                    className="border border-gray-300 p-2 rounded"
                    placeholder="Chọn danh mục con"
                    value={categoryChildId || ""}
                    onChange={handleChangeCategoryChild}
                    required
                >
                    <option value="">Chọn danh mục con</option>
                    {categoryChildren.map((categoryChild) => (
                        <option key={categoryChild.id} value={categoryChild.id}>
                            {categoryChild.name}
                        </option>
                    ))}
                </select>
            )}
            {categoryChildren.length > 1 && (
                <CategoryChildren categoryParentId={categoryChildId} />
            )}
        </>
    );
}

export default memo(CategoryChildren);
