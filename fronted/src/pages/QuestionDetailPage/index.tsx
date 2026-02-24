import { message } from "antd";
import { useParams } from "react-router";
import { getQuestionVOAPI } from "@/api/question";
import QuestionCard from "@/components/QuestionCard";
import { useRequest } from "ahooks";

export default function QuestionDetailPage() {
  const { questionId } = useParams();

  const { data: question, loading } = useRequest(
    async () => {
      console.log("questionId", questionId);
      const res = await getQuestionVOAPI(Number(questionId));
      console.log(res);
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

  if (loading || !question) {
    return <div>加载中...</div>;
  }

  return (
    <div id="questionDetailPage">
      <QuestionCard question={question} />
    </div>
  );
}
