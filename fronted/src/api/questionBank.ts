import request from "@/utils/request";
import type {
  listQuestionBanksAPIBodyType,
  listQuestionBanksAPIResponseType,
  getQuestionBankVOByIdAPIResponseType,
  getQuestionBankVOByIdAPIParamsTYpe,
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

// 根据id获取题库VO
export const getQuestionBankVOByIdAPI = async (
  params: getQuestionBankVOByIdAPIParamsTYpe,
): Promise<getQuestionBankVOByIdAPIResponseType> => {
  return request(`/questionBank/get/vo`, {
    method: "GET",
    params: {
      ...params,
    },
  });
};
