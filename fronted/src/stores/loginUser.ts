import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginUserVO } from "@/type/LoginUser";
import { DEFAULT_USER } from "@/constants/user";

export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState: DEFAULT_USER,
  reducers: {
    setLoginUser: (state, action: PayloadAction<LoginUserVO>) => {
      return {
        ...action.payload,
      };
    },
  },
});

export const { setLoginUser } = loginUserSlice.actions;

export default loginUserSlice.reducer;
