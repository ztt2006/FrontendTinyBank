const ErrorCode = require("@/common/ErrorCode");
const ResultUtils = {
  success(data) {
    return {
      code: 0,
      data,
      message: "ok",
    };
  },
  error(errorCode, message) {
    return {
      code: errorCode.code,
      data: null,
      message: message || errorCode.message,
    };
  },
  page(records, total, current, pageSize) {
    return {
      records,
      total,
      current,
      size: pageSize,
      pages: Math.ceil(total / pageSize),
    };
  },
};

module.exports = ResultUtils;
