import type { requestResponse } from "@/type/common";

export type listQuestionsAPIBodyType = {
  current?: number;
  pageSize?: number;
  title?: string;
  tags?: string[];
  questionBankId?: number;
  sortField?: string;
  sortOrder?: "ascend" | "descend";
};

export type record = {
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
export type listQuestionsAPIResponseType = requestResponse<{
  records: record[];
  total: number;
  size: number;
  pages: number;
}>;
