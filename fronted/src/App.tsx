import { useDispatch } from "react-redux";
import type { AppDispatch } from "./stores";
import { getLoginUserUsingAPI } from "./api/user";
import { setLoginUser } from "./stores/loginUser";
import { App as AntdApp } from "antd";
import { useEffect } from "react";
import { Outlet } from "react-router";
import BasicLayout from "./layouts/BasicLayout";
function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { message } = AntdApp.useApp();

  const doInitLoginUser = async () => {
    try {
      const res = await getLoginUserUsingAPI();
      console.log(res);
      if (res.data) {
        dispatch(setLoginUser(res.data));
      } else {
        message.error(res.message || "当前未登录");
      }
    } catch (error) {
      message.error("获取当前登录用户失败" + (error as Error).message);
    }
  };

  useEffect(() => {
    doInitLoginUser();
  }, []);

  return (
    <BasicLayout>
      <Outlet />
    </BasicLayout>
  );
}

export default App;
