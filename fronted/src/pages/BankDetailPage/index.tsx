import { Avatar, Button, Card, message, Typography } from "antd";
import { getQuestionBankVOByIdAPI } from "@/api/questionBank";
import QuestionList from "@/components/QuestionList";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

const { Title, Paragraph } = Typography;
export default function BanksDetailPage() {
  const { questionBankId } = useParams();
  const [questionBank, setQuestionBank] = useState();
  const fetchData = async () => {
    if (!questionBankId) return;
    try {
      const res = await getQuestionBankVOByIdAPI({
      id: Number(questionBankId),
      needQueryQuestionList: true,
      pageSize: 200,
    });
    console.log(res);
    } catch (error) {
      message.error('获取题库详情失败'+ (error as Error) .message);
    }
    
  };
  useEffect(() => {
      fetchData();
    }, [questionBankId]);
  return <>BankDetailPage</>;
}
