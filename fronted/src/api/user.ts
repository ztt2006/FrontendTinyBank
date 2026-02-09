import request from "@/utils/request";
import type {
  getLoginUserUsingAPIResponse,
  LoginUserVO,
} from "@/type/LoginUser";
// 获取当前登录用户
export const getLoginUserUsingAPI = async (
  options?: LoginUserVO,
): Promise<getLoginUserUsingAPIResponse> => {
  return request.get("/user/get/login", {
    params: options,
  });
};
