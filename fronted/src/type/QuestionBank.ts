import type { requestResponse } from "@/type/common";

export type listQuestionBanksAPIBodyType = {
  current?: number;
  pageSize?: number;
  sortField?: string;
  sortOrder?: "ascend" | "descend";
  title?: string;
};

export type record = {
  id: number;
  title: string;
  description: string;
  picture: string;
  userId: number;
  createTime: string;
  updateTime: string;
  user: {
    id: number;
    userName: string;
    userAvatar: string;
  };
};
export type listQuestionBanksAPIResponseType = requestResponse<{
  records: record[];
  total: number;
  size: number;
  pages: number;
}>;

// 根据id获取题库VO
type recordsType = {
  id: number;
  title: string;
  content: string;
  tags: string[];
  answer: string;
  userId: number;
  createTime: string;
  updateTime: string;
  user: {
    id: number;
    userName: string;
    userAvatar: string;
  };
};
export type getQuestionBankVOByIdAPIParamsTYpe = {
  id: number;
  needQueryQuestionList?: boolean;
  pageSize?: number;
  current?: number;
};
type getQuestionBankVOByIdAPIType = {
  id: number;
  title: string;
  description: string;
  picture: string;
  userId: number;
  createTime: string;
  updateTime: string;
  user: {
    id: number;
    userName: string;
    userAvatar: string;
  };
  questionRecords: {
    records: recordsType[];
  };
  total: number;
  current: number;
  size: number;
  pages: number;
};
export type getQuestionBankVOByIdAPIResponseType =
  requestResponse<getQuestionBankVOByIdAPIType>;
