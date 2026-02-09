const ErrorCode = {
  SUCCESS: { code: 0, message: "ok" },
  PARAMS_ERROR: { code: 40000, message: "请求参数错误" },
  NOT_LOGIN_ERROR: { code: 40100, message: "未登录" },
  NO_AUTH_ERROR: { code: 40101, message: "无权限" },
  NOT_FOUND_ERROR: { code: 40400, message: "请求数据不存在" },
  FORBIDDEN_ERROR: { code: 40300, message: "禁止访问" },
  SYSTEM_ERROR: { code: 50000, message: "系统内部异常" },
  OPERATION_ERROR: { code: 50001, message: "操作失败" },
};

module.exports = ErrorCode;
