import CategoryParent from "@/Components/CategoryParentComponent";
import Dropdown from "@/Components/Dropdown";

const CategoryLayout = ({ }) => {

    return (
        <>
            <Dropdown>
                <Dropdown.Trigger>
                    <label htmlFor="title" className="text-lg font-mono text-gray-700 mb-1">
                        Danh mục
                        <span className="text-red-500">*</span>
                    </label><br />
                    <input className="w-full" type="text" placeholder="Chọn danh mục" />
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <CategoryParent width='48' className=" cursor-pointer" />
                </Dropdown.Content>
            </Dropdown>

        </>
    )
}
export default CategoryLayout;