import request from "@/utils/request";
import type {
  listQuestionBankQuestionsAPIBodyType,
  listQuestionBankQuestionsAPIResponseType,
} from "@/type/QuestionBankQuestion";
// 获取题库题目列表
export const listQuestionBankQuestionsAPI = async (
  body: listQuestionBankQuestionsAPIBodyType,
  options?,
): Promise<listQuestionBankQuestionsAPIResponseType> => {
  return request("/questionBankQuestion/list/page/vo", {
    method: "POST",
    data: body,
    ...(options || {}),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
