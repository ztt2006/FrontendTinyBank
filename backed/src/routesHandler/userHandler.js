const ErrorCode = require("@/common/ErrorCode");
const ResultUtils = require("@/common/ResultUtils");
const BusinessException = require("@/common/BusinessException");
const prisma = require("../prisma");

// 用户注册
const registerUserHandler = async (req, res, next) => {
  try {
    const { userAccount, userPassword, checkPassword } = req.body;
    console.log("userAccount", userAccount);
    console.log("userPassword", userPassword);
    console.log("checkPassword", checkPassword);
    // 检查账号是否已存在
    const existUser = await prisma.user.findFirst({
      where: { userAccount, isDelete: 0 },
    });
    if (existUser) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR, "账号已存在");
    }
  } catch (error) {}
};

// 获取当前登录用户
const getLoginUser = async (req, res, next) => {
  try {
    const user = req.session?.user;
    if (!user) {
      throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
    }
    res.status(200).json(ResultUtils.success(user));
  } catch (error) {
    next(error);
  }
};

const userHandler = {
  getLoginUser,
  registerUserHandler,
};

module.exports = userHandler;
