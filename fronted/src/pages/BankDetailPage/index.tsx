import { message } from "antd";
import { getQuestionBankVOByIdAPI } from "@/api/questionBank";
import { useParams, Link } from "react-router";
import { useRequest } from "ahooks";
import QuestionList from "@/components/QuestionList";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import styles from "./index.module.css";

export default function BanksDetailPage() {
  const { questionBankId } = useParams();
  const { data: questionBank, loading } = useRequest(
    async () => {
      const res = await getQuestionBankVOByIdAPI({
        id: Number(questionBankId),
        needQueryQuestionList: true,
        pageSize: 200,
      });
      return res.data;
    },
    {
      ready: Boolean(questionBankId),
      refreshDeps: [questionBankId],
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        message.error(
          `获取题库详情失败${errorMessage ? `：${errorMessage}` : ""}`,
        );
      },
    },
  );

  if (loading || !questionBank) return <>Loading</>;

  console.log("questionBank", questionBank);

  const questionList = questionBank.questionRecords?.records || [];
  console.log("questionList", questionList);

  const firstQuestionId =
    questionList.length > 0 ? questionList[0].id : undefined;
  return (
    <div id="bankDetailPage" className={styles.page}>
      <div className={styles.container}>
        <Card className={styles.heroCard}>
          <CardContent className={styles.heroContent}>
            <div className={styles.mediaWrap}>
              <img
                src={questionBank.picture}
                alt={questionBank.title}
                className={styles.cover}
              />
            </div>
            <div className={styles.info}>
              <div className={styles.headerRow}>
                <h1 className={styles.title}>{questionBank.title}</h1>
                <span className={styles.badge}>题库</span>
              </div>
              <p className={styles.desc}>
                {questionBank.description || "暂无简介"}
              </p>
              <div className={styles.statGroup}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>
                    {questionList.length}
                  </span>
                  <span className={styles.statLabel}>题目数量</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{questionBank.id}</span>
                  <span className={styles.statLabel}>题库编号</span>
                </div>
              </div>
              <div className={styles.actions}>
                {firstQuestionId ? (
                  <Button asChild size="lg">
                    <Link
                      to={`/bank/${questionBankId}/question/${firstQuestionId}`}
                    >
                      开始刷题
                    </Link>
                  </Button>
                ) : (
                  <Button size="lg" disabled>
                    开始刷题
                  </Button>
                )}
                <Button asChild variant="outline" size="lg">
                  <Link to="/banks">返回题库</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className={styles.listSection}>
          <div className={styles.listHeader}>
            <h2 className={styles.listTitle}>题目列表</h2>
            <span className={styles.listHint}>共 {questionList.length} 题</span>
          </div>
          <QuestionList
            questionBankId={Number(questionBankId)}
            questionList={questionList}
            cardTitle={`题目列表（${questionList.length}）`}
          />
        </div>
      </div>
    </div>
  );
}
