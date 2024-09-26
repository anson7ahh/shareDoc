import { memo, useEffect, useState } from "react";

import NavLink from './NavLink'
import axios from "axios";

function CategoryChildren({ id }) {

    const [categoryChildren, setCategoryChildren] = useState([]);
    const [categoryChildId, setCategoryChildId] = useState(null);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    console.log('categoryChildren23123', categoryChildren)
    useEffect(() => {
        if (id) {
            setCategoryChildren([]);
            setCategoryChildId(null);

            const fetchCategoryChildren = async () => {
                try {
                    const response = await axios.get(`upload/${id}`);

                    setCategoryChildren(response.data.categoryChildren);
                    setHoveredCategory(null)


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
    }, [id]);

    const handleMouseEnter = (id) => {
        setCategoryChildId(id);
        setHoveredCategory(id)
    };

    const handleMouseLeave = () => {

    };

    return (
        <>
            <div className="flex flex-col w-[200px] p-2">
                {id && (categoryChildren.map((categoryChild) => (
                    <div
                        id={`category-${categoryChild.id}`}
                        className={`cursor-default p-2 border-2 ${hoveredCategory === categoryChild.id ? 'bg-blue-200' : 'bg-red-200'}`}
                        onMouseEnter={() => handleMouseEnter(categoryChild.id)}
                        onMouseLeave={handleMouseLeave}
                        key={categoryChild.id}
                        value={categoryChild.id}>

                        <NavLink href={`${categoryChild.id}`}>
                            {categoryChild.name}
                        </NavLink>

                    </div>
                )))}
            </div >
            <div>
                {categoryChildren.length > 1 && (
                    < CategoryChildren id={categoryChildId} />
                )}
            </div >

        </>
    );
}

export default memo(CategoryChildren);
