import request from "@/utils/request";
import type {
  listQuestionBanksAPIBodyType,
  listQuestionBanksAPIResponseType,
} from "@/type/QuestionBank";
// 获取题库列表
export const listQuestionBanksAPI = async (
  body: listQuestionBanksAPIBodyType,
  options?,
): Promise<listQuestionBanksAPIResponseType> => {
  return request("/questionBank/list/page/vo", {
    method: "POST",
    data: body,
    ...(options || {}),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
