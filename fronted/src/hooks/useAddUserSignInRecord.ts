import { message } from "antd";
import { useRequest } from "ahooks";

import { addSignInRecordAPI } from "@/api/user";

const useAddUserSignInRecord = () => {
  const { loading } = useRequest(
    async () => {
      const res = await addSignInRecordAPI({});

      message.success(res.message || "添加签到记录成功");
    },
    {
      onError: (error) => {
        message.error(
          "添加签到记录失败" +
            (error instanceof Error ? `：${error.message}` : ""),
        );
      },
    },
  );

  return { loading };
};

export default useAddUserSignInRecord;
