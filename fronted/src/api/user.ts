import request from "@/utils/request";
import type {
  getLoginUserUsingAPIResponse,
  LoginUserVO,
  LoginParamsType,
  RegisterParamsType,
  LoginResponseType,
} from "@/type/LoginUser";
import type { addSignInRecordAPIResponseType } from "@/type/user";
import type { optionType } from "@/type/common";
// 获取当前登录用户
export const getLoginUserUsingAPI = async (
  options?: LoginUserVO,
): Promise<getLoginUserUsingAPIResponse> => {
  return request.get("/user/get/login", {
    params: options,
  });
};

// 用户注销
export const userLogoutAPI = async (options?: LoginUserVO) => {
  return request.post("/user/logout", options || {});
};

// 用户登录
export const userLoginAPI = async (
  options: LoginParamsType,
): Promise<LoginResponseType> => {
  return request.post("/user/login", options);
};

// 用户注册
export const userRegisterAPI = async (options: RegisterParamsType) => {
  return request.post("/user/register", options);
};

// 添加用户签到记录
export const addSignInRecordAPI = async (
  options?: optionType,
): Promise<addSignInRecordAPIResponseType> => {
  return request.post("/user/add/sign_in", options || {});
};
