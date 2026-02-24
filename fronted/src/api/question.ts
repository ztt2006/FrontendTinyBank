import request from "@/utils/request";
import type {
  listQuestionsAPIBodyType,
  listQuestionsAPIResponseType,
  searchQuestionsAPIBodyType,
  searchQuestionsAPIResponseType,
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

// 搜索题目
export const searchQuestionsAPI = async (
  body: searchQuestionsAPIBodyType,
  options?,
): Promise<searchQuestionsAPIResponseType> => {
  return request.post("/question/search/page/vo", body, {
    headers: {
      "Content-Type": "application/json",
    },
    ...(options || {}),
  });
};
