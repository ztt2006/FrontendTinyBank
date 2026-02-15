import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./stores";
import { getLoginUserUsingAPI } from "./api/user";
import { setLoginUser } from "./stores/loginUser";
import { App as AntdApp, Spin } from "antd";
import { useEffect } from "react";
import { Outlet } from "react-router";
import BasicLayout from "./layouts/BasicLayout";
import AccessLayout from "./layouts/AccessLayout";
function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { message } = AntdApp.useApp();
  const loadingCount = useSelector(
    (state: RootState) => state.loading.count,
  );

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
    <>
      <BasicLayout>
        <AccessLayout>
          <Outlet />
        </AccessLayout>
      </BasicLayout>
      {loadingCount > 0 ? (
        <div className="global-loading-overlay">
          <Spin size="large" />
          <span className="global-loading-text">加载中...</span>
        </div>
      ) : null}
    </>
  );
}

export default App;
