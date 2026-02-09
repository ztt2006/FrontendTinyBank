import { ProLayout } from "@ant-design/pro-components";
import { GithubFilled, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { useLocation, useNavigate, Link } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "@/stores";
import { Dropdown, message } from "antd";
import { userLogoutAPI } from "@/api/user";
import { useDispatch } from "react-redux";
import { setLoginUser } from "@/stores/loginUser";
import { DEFAULT_USER } from "@/constants/user";
import SearchInput from "./components/SearchInput";
import GlobalFooter from "@/components/GlobalFooter";
import getAccessibleMenus from "@/access/menuAccess";
import { menus } from "@/config/menu";
// import styles from "./index.module.scss";
export default function BasicLayout({ children }: React.PropsWithChildren) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const dispatch = useDispatch();
  //   用户注销
  const userLogout = async () => {
    try {
      const res = await userLogoutAPI();
      console.log(res);
      message.success("已退出登录");
      dispatch(setLoginUser(DEFAULT_USER));
      navigate("/user/login");
    } catch (error) {
      message.error("操作失败," + (error as Error).message);
    }
  };
  return (
    <div id="basicLayout" style={{ height: "100vh", overflow: "auto" }}>
      <ProLayout
        title="前端小题库" // 网站标题
        layout="top" // 布局模式：top=顶部导航，side=侧边导航，mix=混合
        logo={
          <img
            src={import.meta.env.VITE_LOGO_IMAGE_URL}
            height={32}
            width={32}
            alt="前端小题库"
          />
        } // Logo 图片
        location={{ pathname }} // 当前路径，用于高亮菜单
        avatarProps={{
          src: loginUser.userAvatar || import.meta.env.VITE_DEFAULT_AVATAR_URL,
          size: "small",
          title: loginUser.userName || "未登录用户",
          render: (props, dom) => {
            if (!loginUser.id) {
              return (
                <div
                  onClick={() => {
                    navigate("/user/login");
                  }}
                >
                  {dom}
                </div>
              );
            }
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "userCenter",
                      icon: <UserOutlined />,
                      label: "个人中心",
                    },
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
                  onClick: async (event: { key: React.Key }) => {
                    const { key } = event;
                    if (key === "logout") {
                      userLogout();
                    } else if (key === "userCenter") {
                      navigate("/user/center");
                    }
                  },
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            <SearchInput key="search" />,
            <a
              href="https://github.com/ztt2006/FrontendTinyBank"
              key="github"
              target="_blank"
            >
              <GithubFilled key="GithubFilled"></GithubFilled>
            </a>,
          ];
        }}
        headerTitleRender={(logo, title) => {
          return (
            <a href="/">
              {logo}
              {title}
            </a>
          );
        }}
        footerRender={() => {
          return <GlobalFooter />;
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuDataRender={() => {
          return getAccessibleMenus(loginUser, menus);
        }}
        menuItemRender={(item, dom) => (
          <Link to={item.path || "/"} target={item.target}>
            {dom}
          </Link>
        )}
      >
        {children}
      </ProLayout>
    </div>
  );
}
