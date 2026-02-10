import { Avatar, Card, Col, Row, Typography } from "antd";
import { Link } from "react-router";
import type { record } from "@/type/QuestionBank";
const { Meta } = Card;
const { Paragraph } = Typography;
const QuestionBankList = (props: { questionBankList: record[] }) => {
  const { questionBankList } = props;
  return (
    <div className="question-bank-list">
      <Row gutter={[16, 16]}>
        {questionBankList.map((questionBank) => (
          <Col xs={24} sm={12} md={8} lg={6} key={questionBank.id}>
            <Link to={`/banks/${questionBank.id}`}>
              <Card>
                <Meta
                  avatar={<Avatar src={questionBank.picture} />}
                  title={questionBank.title}
                  description={
                    <Paragraph
                      type="secondary"
                      ellipsis={{ rows: 1 }}
                      style={{ marginBottom: 0 }}
                    >
                      {questionBank.description}
                    </Paragraph>
                  }
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default QuestionBankList;
