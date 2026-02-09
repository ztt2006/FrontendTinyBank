import { userLoginAPI } from "@/api/user";
import type { AppDispatch } from "@/stores";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router";
import type { LoginParamsType } from "@/type/LoginUser";
import { message } from "antd";
import { setLoginUser } from "@/stores/loginUser";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleLogin = async (values: LoginParamsType) => {
    try {
      const res = await userLoginAPI(values);
      console.log(res);
      if (res.data) {
        // 登录成功，跳转到首页
        message.success("登录成功");
        dispatch(setLoginUser(res.data));
        navigate("/");
      }
    } catch (error) {
      message.error("登录失败," + (error as Error).message);
    }
  };

  return (
    <div id="loginPage">
      <LoginForm
        logo={<img src={import.meta.env.VITE_LOGO_IMAGE_URL} alt="logo" />}
        title="前端小题库 - 用户登录"
        subTitle="欢迎使用前端小题库，请登录"
        onFinish={handleLogin}
        submitter={{
          searchConfig: {
            submitText: "登录",
          },
        }}
      >
        <ProFormText
          name="userAccount"
          fieldProps={{ size: "large", prefix: <UserOutlined /> }}
          placeholder="请输入账号"
          rules={[{ required: true, message: "请输入用户账号" }]}
        ></ProFormText>
        <ProFormText.Password
          name="userPassword"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined />,
          }}
          placeholder="请输入密码"
          rules={[{ required: true, message: "请输入用户密码" }]}
        ></ProFormText.Password>
        <div style={{ marginBlockEnd: 24, textAlign: "end" }}>
          还没有账号？
          <Link to="/user/register">去注册</Link>
        </div>
      </LoginForm>
    </div>
  );
}
