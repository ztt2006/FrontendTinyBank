import { Card, Typography } from "antd";
import TagList from "../TagList";
import MdViewer from "../MdViewer";
import useAddUserSignInRecord from "@/hooks/useAddUserSignInRecord";
const { Title } = Typography;

interface Props {
  question;
}

const QuestionCard = (props: Props) => {
  const { question } = props;
  useAddUserSignInRecord();
  return (
    <div className="question-card">
      <Card>
        <Title level={1} style={{ fontSize: 24 }}>
          {question.title}
        </Title>
        <TagList tagList={question.tags} />
        <div style={{ marginBottom: 16 }}></div>
        <MdViewer value={question.content} />
      </Card>
      <div style={{ marginBottom: 16 }}></div>
      <Card title="推荐答案">
        <MdViewer value={question.answer} />
      </Card>
    </div>
  );
};

export default QuestionCard;
