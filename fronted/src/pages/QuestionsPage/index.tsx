import { Typography } from "antd";
import { useSearchParams } from "react-router";
import QuestionTable from "@/components/QuestionTable";
const { Title } = Typography;

export default function QuestionsPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  return (
    <div id="questionsPage" className="p-4 pb-16">
      <Title level={3}>题目大全</Title>
      <QuestionTable defaultSearchParams={{ searchText: q }} />
    </div>
  );
}
