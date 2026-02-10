import request from "@/utils/request";
import type {
  listQuestionsAPIBodyType,
  listQuestionsAPIResponseType,
} from "@/type/Question";
// 获取题目列表
export const listQuestionsAPI = async (
  body: listQuestionsAPIBodyType,
  options?,
): Promise<listQuestionsAPIResponseType> => {
  return request("/question/list/page/vo", {
    method: "POST",
    data: body,
    ...(options || {}),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
