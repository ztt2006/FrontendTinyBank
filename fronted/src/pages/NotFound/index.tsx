import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Home } from "lucide-react";
import styles from "./index.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardContent className={styles.cardContent}>
          {/* 404 数字 */}
          <div className={styles.visualBlock}>
            <span className={styles.bigNumber}>404</span>
            <span className={styles.oopsText}>Oops!</span>
          </div>

          {/* 渐变分割线 */}
          <div className={styles.divider} />

          {/* 文案 */}
          <div className={styles.textBlock}>
            <h2 className={styles.title}>页面走丢了</h2>
            <p className={styles.subtitle}>
              抱歉，您访问的页面不存在或已被移除。
              <br />
              请检查网址是否正确，或返回首页继续浏览。
            </p>
          </div>

          {/* 操作按钮 */}
          <div className={styles.actions}>
            <Button variant="outline" size="lg" onClick={() => navigate(-1)}>
              <ArrowLeft />
              返回上一页
            </Button>
            <Button size="lg" onClick={() => navigate("/")}>
              <Home />
              回到首页
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
