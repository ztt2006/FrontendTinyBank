const ErrorCode = require("@/common/ErrorCode");
const ResultUtils = require("@/common/ResultUtils");

function errorHandler(err, req, res, next) {
  // 业务异常不打印堆栈,只打印简单日志
  if (err.name === "BusinessException") {
    // 40100 未登录是正常情况,不打印日志
    if (err.code !== 40100) {
      console.log(`BusinessError: ${err.message} (code:${err.code})`);
    }
    return res.json({
      code: err.code,
      data: null,
      message: err.message,
    });
  }

  //   系统异常打印完整错误
  console.error("SystemError:", err);
  return res.json(
    ResultUtils.error(ErrorCode.SYSTEM_ERROR, err.message || "系统错误"),
  );
}

module.exports = { errorHandler };
