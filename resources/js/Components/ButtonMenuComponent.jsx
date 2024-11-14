import { memo, useEffect, useRef, useState } from "react";

import ButtonCategoryChildrent from './ButtonCategoryChildrent';
import Dropdown from "./Dropdown";

const ButtonMenuComponent = () => {
    const [categoriesParent, setCategoriesParent] = useState([]);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const storedCategories = localStorage.getItem('categoriesParent');
        if (storedCategories) {
            setCategoriesParent(JSON.parse(storedCategories));
        }
    }, []);

    const handleMouseEnter = (id) => {
        clearTimeout(timeoutRef.current);
        setHoveredCategory(id);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setHoveredCategory(null), 200);
    };

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <button
                    type="button"
                    aria-label="Open menu"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 transition duration-150"
                >
                    Menu
                </button>
            </Dropdown.Trigger>
            <Dropdown.Content align="left" contentClasses="py-1 bg-white absolute z-50  mt-5 rounded-md ring-1 ring-black ring-opacity-5 ">
                <div className="flex flex-row  py-2 gap-5">
                    <div className="w-[200px] flex flex-col gap-2 ">
                        {categoriesParent.length > 0 && categoriesParent.map((category) => (
                            <div
                                key={category.id}
                                onMouseEnter={() => handleMouseEnter(category.id)}
                                onMouseLeave={handleMouseLeave}
                                className={`cursor-pointer p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition duration-150 rounded 
                                    ${hoveredCategory === category.id ? 'bg-blue-100' : ''}`}
                            >
                                <Dropdown.Link href={`doc-cat/${category.id}`} aria-label={`Parent category ${category.name}`}>
                                    {category.name}
                                </Dropdown.Link>
                            </div>
                        ))}
                    </div>
                    {hoveredCategory && (
                        <div className="flex flex-row gap-5  " onMouseEnter={() => clearTimeout(timeoutRef.current)}>
                            <ButtonCategoryChildrent id={hoveredCategory} />
                        </div>
                    )}
                </div>
            </Dropdown.Content>
        </Dropdown >
    );
};

export default memo(ButtonMenuComponent);
