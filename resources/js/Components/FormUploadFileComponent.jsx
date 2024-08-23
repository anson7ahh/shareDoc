import Category from "@/Components/CategoryComponent";
import { useForm } from "@inertiajs/react";

export default function FormUploadFile() {
    const { data, setData, post } = useForm({
        title: "",
        description: "",
        source: "",
        point: "",
        category_id: "",
        progress: 0,
    });
    const handleSetCategory = (id) => {
        setData('category_id', id);
    };
    return (
        <form
            className=""
            onSubmit={(e) => {
                e.preventDefault();
                post("/upload");
            }}
        >
            <div div className="flex flex-col gap-4 mt-2" id="fileDetail">
                <div><p className="text-pretty font-bold font-mono text-xl">Thêm thông tin cho tài liệu </p></div>
                <div>
                    <label
                        htmlFor="title"
                        className=" text-lg font-mono text-gray-700 mb-1"
                    >
                        Tên tài liệu
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={data.title}
                        placeholder="Tên tài liệu"
                        className="block w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => setData("title", e.target.value)}
                    />
                </div>
                <Category handleSetCategory={handleSetCategory} />
                <label
                    htmlFor="description"
                    className=" text-lg font-mono text-gray-700 mb-1"
                >
                    Mô tả
                </label>
                <textarea
                    name="description"
                    id="description"
                    value={data.description}
                    placeholder="Mô tả chi tiết tài liệu của bạn ."
                    className="border border-gray-300 p-2 rounded resize-none h-[120px] focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setData("description", e.target.value)}
                    required
                ></textarea>
                <label
                    htmlFor="source"
                    className=" text-lg font-mono text-gray-700 mb-1"
                >
                    Nguồn(nếu có)

                </label>
                <input
                    type="text"
                    name="source"
                    id="source"
                    value={data.source}
                    placeholder="Nguồn (nếu có)"
                    className="border border-gray-300 p-2 rounded"
                    onChange={(e) => setData("source", e.target.value)}
                />
                <label
                    htmlFor="point"
                    className=" text-lg font-mono text-gray-700 mb-1"
                >
                    Giá
                    <span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    name="point"
                    id="point"
                    value={data.point}
                    placeholder="Giá"
                    className="border border-gray-300 p-2 rounded text-gray-500"
                    onChange={(e) => setData("point", e.target.value)}
                />
                <button
                    type="submit"
                    id="submit-btn"
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                    disabled={!data.file || !data.title || !data.point}
                >
                    Lưu thông tin
                </button>
            </div>

        </form >
    )
}