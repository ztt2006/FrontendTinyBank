const ErrorCode = require("@/common/ErrorCode");
const ResultUtils = {
  success(data, message = "ok") {
    return {
      code: 0,
      data,
      message,
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
