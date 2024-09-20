import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import axios from "axios";
import {
    setCategoryId
} from '@/redux/FileSlice';

function CategoryChildren({ categoryParentId }) {
    const dispatch = useDispatch();
    const [categoryChildren, setCategoryChildren] = useState([]);
    const [categoryChildId, setCategoryChildId] = useState(null);

    useEffect(() => {
        if (categoryParentId) {
            // Mỗi khi parentId thay đổi, reset dữ liệu trước
            setCategoryChildren([]);
            setCategoryChildId(null);

            const fetchCategoryChildren = async () => {
                try {
                    const response = await axios.get(`upload/${categoryParentId}`);
                    console.log("Dữ liệu danh mục con:", response.data);
                    setCategoryChildren(response.data.categoryChildren);
                } catch (error) {
                    console.error("Có lỗi xảy ra khi lấy danh mục con:", error);
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
