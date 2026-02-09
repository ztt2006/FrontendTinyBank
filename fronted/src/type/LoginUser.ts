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
};

export type LoginResponseType = requestResponse<LoginUserVO>;

export type RegisterParamsType = {
  userAccount: string;
  userPassword: string;
  checkPassword: string;
};

export type getLoginUserUsingAPIResponse = requestResponse<LoginUserVO>;
