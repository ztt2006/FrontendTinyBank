import { Card, Flex } from "antd";
import { Link } from "react-router";
import TagList from "@/components/TagList";

import type { record } from "@/type/Question";
interface Props {
  questionList: record[];
  questionBankId?: number;
  cardTitle?: string;
}

const QuestionList = (props: Props) => {
  const { questionList = [], questionBankId, cardTitle } = props;
  return (
    <Card className="question-list" title={cardTitle}>
      <Flex vertical>
        {questionList.map((item, index) => (
          <Flex
            key={item.id}
            justify="space-between"
            align="center"
            style={{
              padding: "12px 0",
              borderTop: index !== 0 ? "1px solid #f0f0f0" : undefined,
            }}
          >
            <Link
              to={
                questionBankId
                  ? `/bank/${questionBankId}/question/${item.id}`
                  : `/question/${item.id}`
              }
            >
              {item.title}
            </Link>
            <TagList tagList={item.tags} />
          </Flex>
        ))}
      </Flex>
    </Card>
  );
};

export default QuestionList;
