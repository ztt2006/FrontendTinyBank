import { createRoot } from "react-dom/client";
import "./global-tailwind.css";
import "./global.scss";
import router from "./router/index.tsx";
import { RouterProvider } from "react-router/dom";
import { App } from "antd";

import store from "./stores";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App>
      <RouterProvider router={router} />
    </App>
  </Provider>,
);
