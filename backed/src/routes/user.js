const express = require("express");
const router = express.Router();

const userHandler = require("@/routesHandler/userHandler");
const {
  registerValidation,
  loginValidation,
  handleValidationErrors,
} = require("@/utils/validate/user");

// 注册用户（校验规则 -> 校验结果处理 -> 业务逻辑）
router.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  userHandler.registerUserHandler,
);

// 登录用户
router.post(
  "/login",
  loginValidation,
  handleValidationErrors,
  userHandler.loginUserHandler,
);

// 添加用户签到记录
router.post("/add/sign_in", userHandler.addSignInRecordHandler);
// 获取用户签到记录
router.get("/get/sign_in", userHandler.getSignInRecordsHandler);

// 用户注销/退出登录
router.post("/logout", userHandler.logoutUserHandler);
// 获取当前登录用户
router.get("/get/login", userHandler.getLoginUser);

module.exports = router;
