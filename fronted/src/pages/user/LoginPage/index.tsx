import { useState } from "react";
import { userLoginAPI } from "@/api/user";
import type { AppDispatch } from "@/stores";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router";
import type { LoginParamsType } from "@/type/LoginUser";
import { message } from "antd";
import { setLoginUser } from "@/stores/loginUser";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import styles from "./index.module.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<LoginParamsType>({
    userAccount: "",
    userPassword: "",
  });
  const [errors, setErrors] = useState<{
    userAccount?: string;
    userPassword?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.userAccount) newErrors.userAccount = "请输入用户账号";
    if (!formData.userPassword) newErrors.userPassword = "请输入用户密码";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await userLoginAPI(formData);
      if (res.data) {
        message.success("登录成功");
        dispatch(setLoginUser(res.data));
        navigate("/");
      }
    } catch (error) {
      message.error("登录失败," + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardContent className={styles.cardContent}>
          {/* 头部 */}
          <div className={styles.header}>
            <img
              src={import.meta.env.VITE_LOGO_IMAGE_URL}
              alt="logo"
              className={styles.logo}
            />
            <h1 className={styles.title}>前端小题库</h1>
            <p className={styles.subtitle}>欢迎回来，请登录您的账号</p>
          </div>

          {/* 分割线 */}
          <div className={styles.divider}>
            <span className={styles.dividerLine} />
            <span>账号登录</span>
            <span className={styles.dividerLine} />
          </div>

          {/* 表单 */}
          <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="userAccount">账号</Label>
              <div className={styles.inputWrapper}>
                <UserOutlined className={styles.inputIcon} />
                <Input
                  id="userAccount"
                  className={styles.input}
                  placeholder="请输入账号"
                  value={formData.userAccount}
                  onChange={(e) =>
                    setFormData({ ...formData, userAccount: e.target.value })
                  }
                />
              </div>
              {errors.userAccount && (
                <span className={styles.errorText}>{errors.userAccount}</span>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="userPassword">密码</Label>
              <div className={styles.inputWrapper}>
                <LockOutlined className={styles.inputIcon} />
                <Input
                  id="userPassword"
                  type="password"
                  className={styles.input}
                  placeholder="请输入密码"
                  value={formData.userPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, userPassword: e.target.value })
                  }
                />
              </div>
              {errors.userPassword && (
                <span className={styles.errorText}>{errors.userPassword}</span>
              )}
            </div>

            <Button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "登录中..." : "登录"}
            </Button>
          </form>

          {/* 底部 */}
          <div className={styles.footer}>
            还没有账号？
            <Link to="/user/register" className={styles.link}>
              去注册
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
