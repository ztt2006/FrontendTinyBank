import type { requestResponse } from "./common";

export type listQuestionBankQuestionsAPIBodyType = {
  current?: number;
  pageSize?: number;
  questionBankId?: number;
  questionId?: number;
};

export type record = {
  id: number;
  questionBankId: number;
  questionId: number;
  userId: number;
  createTime: string;
  updateTime: string;
  user: {
    id: number;
    userName: string;
    userAvatar: string;
  };
};
export type listQuestionBankQuestionsAPIResponseType = requestResponse<{
  records: record[];
  total: number;
  size: number;
  pages: number;
}>;
