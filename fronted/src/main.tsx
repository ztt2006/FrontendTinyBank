import { createRoot } from "react-dom/client";
import "./global.scss";
import router from "./router/index.tsx";
import { RouterProvider } from "react-router/dom";

import store from "./stores";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
