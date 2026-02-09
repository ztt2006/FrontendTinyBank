const express = require("express");
const router = express.Router();

const userHandler = require("@/routesHandler/userHandler");
const {
  registerValidation,
  handleValidationErrors,
} = require("@/utils/validate/user");

// 注册用户（校验规则 -> 校验结果处理 -> 业务逻辑）
router.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  userHandler.registerUserHandler,
);
// 获取当前登录用户
router.get("/get/login", userHandler.getLoginUser);

module.exports = router;
