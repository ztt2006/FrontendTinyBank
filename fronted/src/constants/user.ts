import ACCESS_ENUM from "@/access/accessEnum";
import type { LoginUserVO } from "@/type/LoginUser";

export const DEFAULT_USER: LoginUserVO = {
  userName: "未登录",
  userProfile: "暂无简介",
  userAvatar: "/assets/notLoginUser.png",
  userRole: ACCESS_ENUM.NOT_LOGIN,
};
