import { Typography, Divider, Flex, message } from "antd";
import { Link } from "react-router";
import { listQuestionBanksAPI } from "@/api/questionBank";
import { listQuestionsAPI } from "@/api/question";
import type { record } from "@/type/QuestionBank";
import type { record as questionRecord } from "@/type/Question";
import { useRequest } from "ahooks";
import QuestionBankList from "@/components/QuestionBankList";
import QuestionList from "@/components/QuestionList";
export default function HomePage() {
  const { Title } = Typography;

  const { data: questionBankList = [] } = useRequest(
    async () => {
      const res = await listQuestionBanksAPI({
        pageSize: 12,
        sortField: "createTime",
        sortOrder: "descend",
      });
      console.log(res);

      return res.data.records as record[];
    },
    {
      onError: (error) => {
        message.error("获取题库列表失败," + error.message);
      },
    },
  );
  console.log("questionBankList", questionBankList);

  const { data: questionList = [] } = useRequest(
    async () => {
      const res = await listQuestionsAPI({
        pageSize: 12,
        sortField: "createTime",
        sortOrder: "descend",
      });
      return res.data.records as questionRecord[];
    },
    {
      onError: (error) => {
        message.error("获取题目列表失败," + error.message);
      },
    },
  );

  return (
    <div id="homePage" className="max-width-content">
      <Flex justify="space-between" align="center">
        <Title level={3}>最新题库</Title>
        <Link to="/banks">查看更多</Link>
      </Flex>
      <QuestionBankList questionBankList={questionBankList} />
      <Divider />
      <Flex justify="space-between" align="center">
        <Title level={3}>最新题目</Title>
        <Link to="/questions">查看更多</Link>
      </Flex>
      <QuestionList questionList={questionList} />
    </div>
  );
}
