import "../css/app.css";

import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import store from "@/redux/Store";

const appName = import.meta.env.VITE_APP_NAME || "Share Doc Study";

createInertiaApp({
    title: (title) => `${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(

            <BrowserRouter>
                <Provider store={store}>
                    <App {...props} />
                </Provider>,
            </BrowserRouter>

        );
    },
    progress: {
        color: "#4B5563",
    },
});
