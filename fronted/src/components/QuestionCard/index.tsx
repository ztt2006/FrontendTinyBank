import TagList from "../TagList";
import MdViewer from "../MdViewer";
import useAddUserSignInRecord from "@/hooks/useAddUserSignInRecord";
import { Card } from "@/components/ui/card";
import { FileText, Lightbulb } from "lucide-react";
import styles from "./index.module.css";

interface Props {
  question;
}

const QuestionCard = (props: Props) => {
  const { question } = props;
  useAddUserSignInRecord();
  return (
    <div className={styles.container}>
      {/* 题目卡片 */}
      <Card className={styles.questionCard}>
        <div className={styles.questionHeader}>
          <div className={styles.questionTitleRow}>
            <div className={styles.questionIcon}>
              <FileText className={styles.questionIconSvg} />
            </div>
            <div className={styles.questionTitleWrap}>
              <h1 className={styles.questionTitle}>{question.title}</h1>
              <div className={styles.questionTags}>
                <TagList tagList={question.tags} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.questionContent}>
          <div className={styles.prose}>
            <MdViewer value={question.content} />
          </div>
        </div>
      </Card>

      {/* 答案卡片 */}
      <Card className={styles.answerCard}>
        <div className={styles.answerHeader}>
          <div className={styles.answerIcon}>
            <Lightbulb className={styles.answerIconSvg} />
          </div>
          <h2 className={styles.answerTitle}>推荐答案</h2>
        </div>
        <div className={styles.answerContent}>
          <div className={styles.prose}>
            <MdViewer value={question.answer} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QuestionCard;
