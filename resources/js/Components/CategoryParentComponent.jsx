import { memo, useCallback, useContext, useEffect } from "react";

import { CategoriesParentContext } from "@/Pages/User/Upload";
import axios from "axios";
import { useForm } from "@inertiajs/react";

function Category({ handleSetCategory }) {
    const { data, setData } = useForm({
        categoryParent: "",
        categoryChildren: [],
        categoryGrandChildren: [],
        selectedCategoryChild: "",
        selectedCategoryGrandChild: '',

    });
    const categoriesParent = useContext(CategoriesParentContext)
    const handleChangeCategoryParent = (e) => {
        setData("categoryParent", e.target.value);
    };

    const handleChangeCategoryChild = useCallback((e) => {
        const selectedCategoryChild = e.target.value;
        handleSetCategory(selectedCategoryChild);
        setData((prevData) => ({
            ...prevData,
            selectedCategoryChild: selectedCategoryChild,
        }));
    }, [data.selectedCategoryChild]);

    const handleChangeCategoryGrandChild = useCallback((e) => {
        const selectedCategoryGrandChild = e.target.value;
        handleSetCategory(selectedCategoryGrandChild)
        setData((prevData) => ({
            ...prevData,
            selectedCategoryGrandChild: selectedCategoryGrandChild,

        }));
    }, [data.selectedCategoryGrandChild]);

    useEffect(() => {
        if (data.categoryParent) {
            const fetchCategoryChildren = async () => {
                try {
                    const response = await axios.get(`upload/${data.categoryParent}`);
                    console.log("Dữ liệu danh mục con:", response.data);
                    setData((prevData) => ({
                        ...prevData,
                        categoryChildren: response.data.categoryChildren || [],
                    }));
                } catch (error) {
                    console.error("Có lỗi xảy ra khi lấy danh mục con:", error);
                    setData((prevData) => ({
                        ...prevData,
                        categoryChildren: [],
                    }));
                }
            };

            fetchCategoryChildren();
        } else {
            setData((prevData) => ({
                ...prevData,
                categoryChildren: [],
            }));
        }
    }, [data.categoryParent]);

    useEffect(() => {
        if (data.selectedCategoryChild) {
            const fetchCategoryGrandChildren = async () => {
                try {
                    const response = await axios.get(`upload/${data.selectedCategoryChild}`);
                    console.log("Dữ liệu danh mục cháu:", response.data);
                    setData((prevData) => ({
                        ...prevData,
                        categoryGrandChildren: response.data.categoryChildren || [],
                    }));
                } catch (error) {
                    console.error("Có lỗi xảy ra khi lấy danh mục cháu:", error);
                    setData((prevData) => ({
                        ...prevData,
                        categoryGrandChildren: [],
                    }));
                }
            };

            fetchCategoryGrandChildren();
        } else {
            setData((prevData) => ({
                ...prevData,
                categoryGrandChildren: [],
            }));
        }
    }, [data.selectedCategoryChild]);

    return (
        <>
            <label htmlFor="categoryParent" className="block text-lg font-mono text-gray-700 mb-1">
                Chọn danh mục
                <span className="text-red-500">*</span>
            </label>
            <select
                className="border border-gray-300 p-2 rounded"
                placeholder="Chọn danh mục"
                id="categoryParent"
                onChange={handleChangeCategoryParent}
                value={data.categoryParent}
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
                    value={data.selectedCategoryChild}
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
                    placeholder="Chọn danh mục"
                    onChange={handleChangeCategoryGrandChild}
                    value={data.selectedCategoryGrandChild}
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
export default memo(Category)