import { useEffect, useState } from "react";

import Dropdown from "./Dropdown";

const MenuButton = () => {
    const [categoriesParent, setCategoriesParent] = useState([]);

    useEffect(() => {
        const storedCategories = localStorage.getItem('categoriesParent');
        if (storedCategories) {
            setCategoriesParent(JSON.parse(storedCategories));
        }
    }, []);

    return (
        <div className="relative">
            <Dropdown>
                <Dropdown.Trigger>
                    <button
                        type="button"
                        className="relative inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                    >
                        Menu
                    </button>
                </Dropdown.Trigger>
                <Dropdown.Content className=" border-2" align='left'>
                    <div className="w-[200px] p-4 ">
                        {categoriesParent.length > 0 && (
                            categoriesParent.map((category) => (
                                <div className="cursor-default  bg-red-200" key={category.id}>{category.name}</div>
                            ))
                        )}
                    </div>
                </Dropdown.Content>
            </Dropdown>
        </div >
    );
};

export default MenuButton;
