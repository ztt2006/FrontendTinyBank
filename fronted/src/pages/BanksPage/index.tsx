import { message, Pagination } from "antd";
import QuestionBankList from "@/components/QuestionBankList";
import { listQuestionBanksAPI } from "@/api/questionBank";
import { useRequest } from "ahooks";
import { Card, CardContent } from "@/components/ui/card";
import styles from "./index.module.css";
import { useState } from "react";
export default function BanksPage() {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: questionBankList, loading } = useRequest(
    async () => {
      const res = await listQuestionBanksAPI({
        current,
        pageSize,
        sortField: "createTime",
        sortOrder: "descend",
      });
      return res.data;
    },
    {
      refreshDeps: [current, pageSize],
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        message.error(
          `获取题库列表失败${errorMessage ? `：${errorMessage}` : ""}`,
        );
      },
    },
  );
  console.log("questionBankList", questionBankList);
  const totalCount = questionBankList?.total ?? 0;
  const effectivePageSize =
    questionBankList?.size ?? questionBankList?.records?.length ?? pageSize;
  const pageCount = questionBankList?.pages ?? 0;
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Card className={styles.headerCard}>
          <CardContent className={styles.headerContent}>
            <div className={styles.titleRow}>
              <div className={styles.titleBlock}>
                <span className={styles.kicker}>题库中心</span>
                <h1 className={styles.title}>题库列表</h1>
                <p className={styles.subtitle}>
                  选择适合的题库开始练习，持续积累你的知识库
                </p>
              </div>
              <div className={styles.statGroup}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{totalCount}</span>
                  <span className={styles.statLabel}>题库总数</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{pageCount}</span>
                  <span className={styles.statLabel}>页数</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{effectivePageSize}</span>
                  <span className={styles.statLabel}>每页数量</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={styles.listCard}>
          <CardContent className={styles.listContent}>
            <div className={styles.listHeader}>
              <div className={styles.listTitleWrap}>
                <h2 className={styles.listTitle}>精选题库</h2>
                <span className={styles.listSubtitle}>持续更新中</span>
              </div>
              <span className={styles.listHint}>
                {loading
                  ? "加载中..."
                  : `已加载 ${questionBankList?.records?.length ?? 0} 个`}
              </span>
            </div>
            <div className={styles.listBody}>
              <QuestionBankList
                questionBankList={questionBankList?.records || []}
              />
            </div>
            <div className={styles.pagination}>
              <Pagination
                current={current}
                pageSize={pageSize}
                total={totalCount}
                showSizeChanger
                showQuickJumper
                pageSizeOptions={[6, 10, 20, 30]}
                onChange={(page, size) => {
                  setCurrent(page);
                  if (size !== pageSize) {
                    setPageSize(size);
                    setCurrent(1);
                  }
                }}
                disabled={loading}
                showTotal={(total) => `共 ${total} 个`}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
