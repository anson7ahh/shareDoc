
const AsideComponent = ({ show, showDownloaded }) => {
    const handleDownloadClick = () => {
        show(true);
    };

    const handleUploadClick = () => {
        show(false);
    };

    return (
        <div className="flex h-full relative">
            <aside className="w-[250px] pt-[100px] flex flex-col p-6 border-r border-gray-300 h-full bg-gray-50 shadow-lg">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Quản lý Tài liệu</h2>

                {/* Nút Tải xuống */}
                <button
                    className={`mb-4 w-full p-3 rounded-lg text-left ${showDownloaded ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'
                        } border border-gray-300 hover:bg-blue-500 transition duration-300`}
                    onClick={handleDownloadClick}
                >
                    Đã tải xuống
                </button>

                {/* Nút Tải lên */}
                <button
                    className={`w-full p-3 rounded-lg text-left ${!showDownloaded ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'
                        } border border-gray-300 hover:bg-blue-500 transition duration-300`}
                    onClick={handleUploadClick}
                >
                    Đã tải lên
                </button>
            </aside>
        </div>
    );
};

export default AsideComponent;
