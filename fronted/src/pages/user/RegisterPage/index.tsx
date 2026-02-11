import { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useNavigate, Link } from "react-router";
import { userRegisterAPI } from "@/api/user";
import type { RegisterParamsType } from "@/type/LoginUser";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import styles from "./index.module.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterParamsType>({
    userAccount: "",
    userPassword: "",
    checkPassword: "",
  });
  const [errors, setErrors] = useState<{
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!formData.userAccount) newErrors.userAccount = "请输入用户账号";
    if (!formData.userPassword) newErrors.userPassword = "请输入密码";
    if (!formData.checkPassword) newErrors.checkPassword = "请输入确认密码";
    if (
      formData.userPassword &&
      formData.checkPassword &&
      formData.userPassword !== formData.checkPassword
    ) {
      newErrors.checkPassword = "两次输入的密码不一致";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await userRegisterAPI(formData);
      message.success("注册成功，请登录");
      navigate("/user/login");
    } catch (error) {
      message.error("注册失败，" + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardContent className={styles.cardContent}>
          <div className={styles.header}>
            <img
              src={import.meta.env.VITE_LOGO_IMAGE_URL}
              alt="logo"
              className={styles.logo}
            />
            <h1 className={styles.title}>创建账号</h1>
            <p className={styles.subtitle}>欢迎使用前端小题库，请先完成注册</p>
          </div>

          <div className={styles.divider}>
            <span className={styles.dividerLine} />
            <span>账号注册</span>
            <span className={styles.dividerLine} />
          </div>

          <form className={styles.form} onSubmit={handleRegister}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="userAccount">账号</Label>
              <div className={styles.inputWrapper}>
                <UserOutlined className={styles.inputIcon} />
                <Input
                  id="userAccount"
                  className={styles.input}
                  placeholder="请输入用户账号"
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

            <div className={styles.fieldGroup}>
              <Label htmlFor="checkPassword">确认密码</Label>
              <div className={styles.inputWrapper}>
                <LockOutlined className={styles.inputIcon} />
                <Input
                  id="checkPassword"
                  type="password"
                  className={styles.input}
                  placeholder="请再次输入密码"
                  value={formData.checkPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, checkPassword: e.target.value })
                  }
                />
              </div>
              {errors.checkPassword && (
                <span className={styles.errorText}>{errors.checkPassword}</span>
              )}
            </div>

            <Button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "注册中..." : "注册"}
            </Button>
          </form>

          <div className={styles.footer}>
            已有账号？
            <Link to="/user/login" className={styles.link}>
              去登录
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
