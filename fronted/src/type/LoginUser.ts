import type { requestResponse } from "./common";
export type LoginUserVO = {
  createTime?: string;
  id?: number;
  updateTime?: string;
  userAvatar?: string;
  userName?: string;
  userProfile?: string;
  userRole?: string;
};

export type LoginParamsType = {
  userAccount: string;
  userPassword: string;
}

export type getLoginUserUsingAPIResponse = requestResponse<LoginUserVO>;
