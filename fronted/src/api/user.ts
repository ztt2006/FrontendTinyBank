import request from "@/utils/request";
import type {
  getLoginUserUsingAPIResponse,
  LoginUserVO,
  LoginParamsType,
  RegisterParamsType,
  LoginResponseType,
} from "@/type/LoginUser";
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
