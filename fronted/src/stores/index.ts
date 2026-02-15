import { configureStore } from "@reduxjs/toolkit";
import loginUser from "./loginUser";
import loading from "./loading";

const store = configureStore({
  reducer: {
    loginUser,
    loading,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
