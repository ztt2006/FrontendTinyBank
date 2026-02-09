const ErrorCode = require("@/common/ErrorCode");
const ResultUtils = require("@/common/ResultUtils");
const BusinessException = require("@/common/BusinessException");
const prisma = require("../prisma");
const { encryptPassword } = require("@/utils/crypto");

// 用户注册
const registerUserHandler = async (req, res, next) => {
  try {
    const { userAccount, userPassword, checkPassword } = req.body;
    // 检查账号是否已存在
    const existUser = await prisma.user.findFirst({
      where: { userAccount, isDelete: 0 },
    });
    if (existUser) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR, "账号已存在");
    }
    const encryptedPassword = encryptPassword(userPassword);
    console.log("encryptedPassword", encryptedPassword);
    const newUser = await prisma.user.create({
      data: {
        userAccount,
        userPassword: encryptedPassword,
        userName: `user_${Date.now()}`,
        userAvatar:
          "https://lvyou-1332935562.cos.ap-nanjing.myqcloud.com/ceshi%2FIMG_1282.PNG",
      },
    });
    res.status(200).json(
      ResultUtils.success(
        {
          id: newUser.id,
          userAccount: newUser.userAccount,
        },
        "注册成功",
      ),
    );
  } catch (error) {
    next(error);
  }
};

// 用户登录
const loginUserHandler = async (req, res, next) => {
  try {
    const { userAccount, userPassword } = req.body;
    const encryptedPassword = encryptPassword(userPassword);

    const user = await prisma.user.findFirst({
      where: {
        userAccount,
        userPassword: encryptedPassword,
        isDelete: 0,
      },
    });
    if (!user) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR, "账号或密码错误");
    }
    if (user.userRole === "ban") {
      throw new BusinessException(
        ErrorCode.PARAMS_ERROR,
        "该用户已被封禁，无法登录",
      );
    }

    const loginUserVO = {
      id: Number(user.id),
      userAccount: user.userAccount,
      userName: user.userName,
      userAvatar: user.userAvatar,
      userProfile: user.userProfile,
      userRole: user.userRole,
      createTime: user.createTime,
      updateTime: user.updateTime,
    };
    req.session.user = loginUserVO;

    res.status(200).json(ResultUtils.success(loginUserVO, "登录成功"));
  } catch (error) {
    next(error);
  }
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

// 用户注销/退出登录
const logoutUserHandler = async (req, res, next) => {
  try {
    if (!req.session?.user) {
      throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json(ResultUtils.success(null, "注销成功"));
    });
  } catch (error) {
    next(error);
  }
};

const userHandler = {
  getLoginUser,
  registerUserHandler,
  loginUserHandler,
  logoutUserHandler,
};

module.exports = userHandler;
