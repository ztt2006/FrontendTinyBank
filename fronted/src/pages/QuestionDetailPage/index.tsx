import { message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getQuestionVOAPI } from "@/api/question";
import QuestionCard from "@/components/QuestionCard";
export default function QuestionDetailPage() {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const fetchData = async () => {
    try {
      console.log("questionId", questionId);

      const res = await getQuestionVOAPI(Number(questionId));
      console.log(res);
      setQuestion(res.data);
    } catch (error) {
      message.error(
        "获取题目失败" + (error instanceof Error ? `：${error.message}` : ""),
      );
    }
  };
  useEffect(() => {
    fetchData();
  }, [questionId]);
  if (!question) {
    return <div>加载中...</div>;
  }
  return (
    <div id="questionDetailPage">
      <QuestionCard question={question} />
    </div>
  );
}
