import { menus } from "@/config/menu";
import checkAccess from "@/access/checkAccess";
import type { LoginUserVO } from "@/type/LoginUser";
const getAccessibleMenus = (loginUser: LoginUserVO, menuItems = menus) => {
  return menuItems.filter((item) => {
    if (!checkAccess(loginUser, item.access)) {
      return false;
    }
    if (item.children) {
      item.children = getAccessibleMenus(loginUser, item.children);
    }
    return true;
  });
};

export default getAccessibleMenus;
