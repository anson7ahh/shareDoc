import { memo, useEffect, useState } from "react";

import Dropdown from "./Dropdown";
import axios from "axios";

function ButtonCategoryChildrent({ id }) {
    const [categoryChildren, setCategoryChildren] = useState([]);
    const [categoryChildId, setCategoryChildId] = useState(null);
    const [hoveredCategory, setHoveredCategory] = useState(null);

    useEffect(() => {
        if (id) {
            setCategoryChildren([]);
            setCategoryChildId(null);
            const fetchCategoryChildren = async () => {
                try {
                    const response = await axios.get(`upload/${id}`);
                    setCategoryChildren(response.data.categoryChildren);
                } catch (error) {
                    console.error("Có lỗi xảy ra khi lấy danh mục con:", error);
                }
            };
            fetchCategoryChildren();
        }
    }, [id]);

    const handleMouseEnter = (childId) => {
        setCategoryChildId(childId);
        setHoveredCategory(childId);
    };

    return (
        <>
            <div className="flex flex-col w-[200px] gap-2">
                {id && categoryChildren.map((categoryChild) => (
                    <div
                        key={categoryChild.id}
                        onMouseEnter={() => handleMouseEnter(categoryChild.id)}
                        className={`cursor-pointer p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition duration-150 rounded 
                            ${hoveredCategory === categoryChild.id ? 'bg-blue-200 border-blue-300' : 'bg-gray-100 border-gray-200'}`}
                    >
                        <Dropdown.Link href={`doc-cat/${categoryChild.id}`} aria-label={`Category ${categoryChild.name}`}>
                            {categoryChild.name}
                        </Dropdown.Link>
                    </div>
                ))}
            </div>
            {categoryChildren.length > 1 && categoryChildId && (
                <ButtonCategoryChildrent id={categoryChildId} />
            )}
        </>
    );
}

export default memo(ButtonCategoryChildrent);
