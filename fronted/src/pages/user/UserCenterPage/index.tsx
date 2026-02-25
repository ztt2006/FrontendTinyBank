import { useSelector } from "react-redux";
import type { RootState } from "@/stores";
import CalendarChart from "../components/CalendarChart";
import { Card } from "@/components/ui/card";
import { CalendarDays, User } from "lucide-react";
import styles from "./index.module.css";

export default function UserCenterPage() {
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const year = new Date().getFullYear();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* 用户信息卡片 */}
          <Card className={styles.profileCard}>
            <div className={styles.profileContent}>
              <div className={styles.avatarWrap}>
                {loginUser?.userAvatar ? (
                  <img
                    src={loginUser.userAvatar}
                    alt={loginUser.userName}
                    className={styles.avatar}
                  />
                ) : (
                  <div className={styles.avatarFallback}>
                    {loginUser?.userName?.charAt(0)?.toUpperCase() || <User className="h-8 w-8" />}
                  </div>
                )}
              </div>
              <div className={styles.userInfo}>
                <h2 className={styles.userName}>{loginUser?.userName || "用户"}</h2>
                <p className={styles.userProfile}>
                  {loginUser?.userProfile || "这个人很懒，什么都没写~"}
                </p>
              </div>
            </div>
          </Card>

          {/* 刷题日历卡片 */}
          <Card className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <div className={styles.chartIcon}>
                <CalendarDays className={styles.chartIconSvg} />
              </div>
              <div className={styles.chartTitleWrap}>
                <h2 className={styles.chartTitle}>{year} 年刷题记录</h2>
                <span className={styles.chartSubtitle}>坚持每天刷题，提升自己</span>
              </div>
            </div>
            <div className={styles.chartContent}>
              <CalendarChart />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
