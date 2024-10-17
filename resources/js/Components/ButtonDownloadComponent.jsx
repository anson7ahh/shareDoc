import { memo, useEffect, useState } from "react";

import NavLink from './NavLink'
import axios from "axios";

function ButtonDownloadComponent({ document }) {

    const handleClick = () => {

    }

    return (
        <>
            <button onClick={handleClick}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all ease-in-out duration-300 w-full">
                Tải xuống
            </button>

        </>
    );
}

export default memo(ButtonDownloadComponent);
