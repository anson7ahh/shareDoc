import { useCallback, useEffect } from "react";

import axios from "axios";
import { useForm } from "@inertiajs/react";

export default function Category({ categoriesParent }) {
    const { data, setData } = useForm({
        categoryParent: "",
        categoryChildren: [],
        categoryGrandChildren: [],
        selectedCategoryChild: "",
        selectedCategoryGrandChild: '',
        category_id: ''
    });

    const handleChangeCategoryParent = (e) => {
        setData("categoryParent", e.target.value);
    };

    const handleChangeCategoryChild = (e) => {
        setData("selectedCategoryChild", e.target.value);


    };
    const handleChangeCategoryGrandChild = (e) => {
        setData("selectedCategoryGrandChild", e.target.value);
        setData("category_id", e.target.value);
    };

    useEffect(() => {
        if (data.categoryParent) {
            const fetchCategoryChildren = async () => {
                try {
                    const response = await axios.get(`upload/${data.categoryParent}`);
                    console.log("Dữ liệu danh mục con:", response.data); // Debug
                    setData("categoryChildren", response.data.categoryChildren || []);
                } catch (error) {
                    console.error("Có lỗi xảy ra khi lấy danh mục con:", error);
                    setData("categoryChildren", []);
                }
            };

            fetchCategoryChildren();
        } else {
            setData("categoryChildren", []);
        }
    }, [data.categoryParent]);

    useEffect(() => {
        if (data.selectedCategoryChild) {
            const fetchCategoryGrandChildren = async () => {
                try {
                    const response = await axios.get(`upload/${data.selectedCategoryChild}`);
                    console.log("Dữ liệu danh mục cháu:", response.data); // Debug
                    setData("categoryGrandChildren", response.data.categoryChildren || []);
                } catch (error) {
                    console.error("Có lỗi xảy ra khi lấy danh mục cháu:", error);
                    setData("categoryGrandChildren", []);
                }
            };

            fetchCategoryGrandChildren();
        } else {
            setData("categoryGrandChildren", []);
        }
    }, [data.selectedCategoryChild]);

    return (
        <>
            <label htmlFor="categoryParent" className="block text-lg font-mono text-gray-700 mb-1">Chọn danh mục
                <span className="text-red-500">*</span>
            </label>
            <select
                className="border border-gray-300 p-2 rounded"
                placeholder="Chọn danh mục"
                id="categoryParent"

                onChange={handleChangeCategoryParent}

            >
                <option value="">Chọn danh mục</option>
                {categoriesParent.map((categoryParent) => (
                    <option key={categoryParent.id} value={categoryParent.id}>
                        {categoryParent.name}
                    </option>
                ))}
            </select>

            {data.categoryChildren.length > 0 && (
                <select
                    className="border border-gray-300 p-2 rounded"
                    placeholder="Chọn danh mục con"
                    onChange={handleChangeCategoryChild}

                >
                    <option value="">Chọn danh mục con</option>
                    {data.categoryChildren.map((categoryChild) => (
                        <option key={categoryChild.id} value={categoryChild.id}>
                            {categoryChild.name}
                        </option>
                    ))}
                </select>
            )}

            {data.categoryGrandChildren.length > 0 && (
                <select
                    className="border border-gray-300 p-2 rounded"
                    placeholder="Chọn danh mục "
                    onChange={handleChangeCategoryGrandChild}
                >
                    <option value="">Chọn danh mục cháu</option>

                    {data.categoryGrandChildren.map((categoryGrandChild) => (
                        <option key={categoryGrandChild.id} value={categoryGrandChild.id}>
                            {categoryGrandChild.name}
                        </option>
                    ))}
                </select>
            )}
        </>
    );
}
