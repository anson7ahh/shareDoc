import { useEffect, useRef, useState } from "react";

import ButtonCategoryChildrent from '@/Components/ButtonCategoryChildrent';
import Dropdown from "@/Components/Dropdown";
import NavLink from '@/Components/NavLink';

const MenuButton = () => {
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
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setHoveredCategory(id);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setHoveredCategory(null);
        }, 200);
    };

    const handleChildMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <button
                    type="button"
                    className="relative inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                >
                    Menu
                </button>
            </Dropdown.Trigger>
            <Dropdown.Content className="border-2" align='left'>
                <div className="flex flex-row w-auto h-auto relative ">
                    <div
                        className="w-[200px] p-2"
                        onMouseLeave={handleMouseLeave}
                    >
                        {categoriesParent.length > 0 && categoriesParent.map((category) => (
                            <div
                                id={`category-${category.id}`}
                                key={category.id}
                                className={`cursor-default p-2 border-2  text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300  ${hoveredCategory === category.id ? 'bg-blue-200' : 'bg-red-200'}`}
                                onMouseEnter={() => handleMouseEnter(category.id)}
                            >
                                <NavLink href={`doc-cat/${category.id}`}>
                                    {category.name}
                                </NavLink>
                            </div>
                        ))}
                    </div>
                    <div
                        onMouseEnter={handleChildMouseEnter}
                        className=" flex flex-row z-50"
                    >
                        {hoveredCategory != null && (
                            <ButtonCategoryChildrent id={hoveredCategory} />
                        )}
                    </div>
                </div>
            </Dropdown.Content>
        </Dropdown>
    );
};

export default MenuButton;
