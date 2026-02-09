import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import { message } from "antd";
import { useNavigate, Link } from "react-router";
import { userRegisterAPI } from "@/api/user";
import type { RegisterParamsType } from "@/type/LoginUser";

export default function RegisterPage() {
  const navigate = useNavigate();

  const doSubmit = async (values: RegisterParamsType) => {
    try {
      const res = await userRegisterAPI(values);
      console.log(res);
      message.success("注册成功，请登录");
      navigate("/user/login");
    } catch (error) {
      message.error("注册失败，" + (error as Error).message);
    }
  };

  return (
    <div id="registerPage">
      <LoginForm<RegisterParamsType>
        logo={<img alt="logo" src={import.meta.env.VITE_LOGO_IMAGE_URL} />}
        title="前端小题库 - 用户注册"
        subTitle="欢迎使用前端小题库，请注册"
        onFinish={doSubmit}
        submitter={{
          searchConfig: {
            submitText: "注册",
          },
        }}
      >
        <ProFormText
          name="userAccount"
          fieldProps={{
            size: "large",
            prefix: <UserOutlined />,
          }}
          placeholder="请输入用户账号"
          rules={[
            {
              required: true,
              message: "请输入用户账号!",
            },
          ]}
        />
        <ProFormText.Password
          name="userPassword"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined />,
          }}
          placeholder="请输入密码"
          rules={[
            {
              required: true,
              message: "请输入密码！",
            },
          ]}
        />
        <ProFormText.Password
          name="checkPassword"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined />,
          }}
          placeholder="请输入确认密码"
          rules={[
            {
              required: true,
              message: "请输入确认密码！",
            },
          ]}
        />
        <div
          style={{
            marginBlockEnd: 24,
            textAlign: "end",
          }}
        >
          已有账号？
          <Link to="/user/login">去登录</Link>
        </div>
      </LoginForm>
    </div>
  );
}
