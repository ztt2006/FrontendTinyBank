const BusinessException = require("../common/BusinessException");
const ErrorCode = require("../common/ErrorCode");
// 获取当前登录用户(必须登录)
const getLoginUserFromSession = (req) => {
  const user = req.session?.user;
  if (!user) {
    throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
  }
  return user;
};

module.exports = {
  getLoginUserFromSession,
};
