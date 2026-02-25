import { message } from "antd";
import QuestionCard from "@/components/QuestionCard";
import { useParams, Link } from "react-router";
import { getQuestionBankVOByIdAPI } from "@/api/questionBank";
import { getQuestionVOAPI } from "@/api/question";
import { useRequest } from "ahooks";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";
import styles from "./index.module.css";

export default function BankQuestionPage() {
  const { questionBankId, questionId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 使用 useRequest 获取题库数据
  const { data: bank, loading: bankLoading } = useRequest(
    async () => {
      if (!questionBankId) {
        throw new Error("题库id不存在");
      }
      const res = await getQuestionBankVOByIdAPI({
        id: Number(questionBankId),
        needQueryQuestionList: true,
        pageSize: 200,
      });
      console.log("bankRes", res);
      return res.data;
    },
    {
      refreshDeps: [questionBankId],
      onError: (error) => {
        message.error(
          "获取题库失败" + (error instanceof Error ? `：${error.message}` : ""),
        );
      },
    },
  );

  // 使用 useRequest 获取题目数据
  const { data: question, loading: questionLoading } = useRequest(
    async () => {
      if (!questionId) {
        throw new Error("题目id不存在");
      }
      const res = await getQuestionVOAPI(Number(questionId));
      console.log("questionRes", res);
      return res.data;
    },
    {
      refreshDeps: [questionId],
      onError: (error) => {
        message.error(
          "获取题目失败" + (error instanceof Error ? `：${error.message}` : ""),
        );
      },
    },
  );

  const questionList = bank?.questionRecords?.records ?? [];

  // 加载骨架屏
  if (bankLoading || questionLoading) {
    return (
      <div className={styles.loadingPage}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingLayout}>
            <div className={styles.loadingSidebar}>
              <Card className={styles.loadingSidebarCard}>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-3">
                  {[...Array(8)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </CardContent>
              </Card>
            </div>
            <div className={styles.loadingMain}>
              <Card className={styles.loadingCard}>
                <CardHeader>
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="mt-2 h-4 w-1/4" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!bank || !question) {
    return (
      <div className={styles.errorPage}>
        <Card className={styles.errorCard}>
          <p className={styles.errorText}>数据加载失败，请刷新重试</p>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* 移动端顶部栏 */}
        <div className={styles.mobileHeader}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={styles.mobileToggle}
          >
            <Menu className="h-5 w-5" />
            <span>{bank.title}</span>
          </button>
        </div>

        <div className={styles.layout}>
          {/* 移动端侧边栏遮罩 */}
          {sidebarOpen && (
            <div
              className={styles.overlay}
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* 侧边栏 */}
          <aside
            className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}
          >
            <Card className={styles.sidebarCard}>
              <div className={styles.sidebarHeader}>
                <div className={styles.sidebarTitleRow}>
                  <div className={styles.sidebarTitleWrap}>
                    <BookOpen className={styles.sidebarIcon} />
                    <h2 className={styles.sidebarTitle}>{bank.title}</h2>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className={styles.sidebarClose}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <span className={styles.sidebarCount}>
                  共 {questionList.length} 道题目
                </span>
              </div>
              <nav className={styles.sidebarNav}>
                {questionList.map((q: { id: number; title: string }, index: number) => {
                  const isActive = String(q.id) === questionId;
                  return (
                    <Link
                      key={q.id}
                      to={`/bank/${questionBankId}/question/${q.id}`}
                      onClick={() => setSidebarOpen(false)}
                      className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                    >
                      <span className={`${styles.navIndex} ${isActive ? styles.navIndexActive : ""}`}>
                        {index + 1}
                      </span>
                      <span className={styles.navText}>{q.title}</span>
                      {isActive && <ChevronRight className={styles.navArrow} />}
                    </Link>
                  );
                })}
              </nav>
            </Card>
          </aside>

          {/* 主内容区 */}
          <main className={styles.main}>
            <QuestionCard question={question} />
          </main>
        </div>
      </div>
    </div>
  );
}
