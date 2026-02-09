const { body, validationResult } = require("express-validator");
const BusinessException = require("@/common/BusinessException");
const ErrorCode = require("@/common/ErrorCode");

// 注册参数校验规则
const registerValidation = [
  body("userAccount")
    .notEmpty()
    .withMessage("账号不能为空")
    .isLength({ min: 4 })
    .withMessage("账号长度不能少于4位"),
  body("userPassword")
    .notEmpty()
    .withMessage("密码不能为空")
    .isLength({ min: 8 })
    .withMessage("密码长度不能少于8位"),
  body("checkPassword")
    .notEmpty()
    .withMessage("确认密码不能为空")
    .custom((value, { req }) => {
      if (value !== req.body.userPassword) {
        throw new Error("两次输入的密码不一致");
      }
      return true;
    }),
];

// 登录参数校验规则
const loginValidation = [
  body("userAccount").notEmpty().withMessage("账号不能为空"),
  body("userPassword").notEmpty().withMessage("密码不能为空"),
];

// 统一处理校验结果的中间件
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // 取第一条错误信息抛出业务异常
    const firstError = errors.array()[0].msg;
    return next(new BusinessException(ErrorCode.PARAMS_ERROR, firstError));
  }
  next();
};

module.exports = {
  registerValidation,
  loginValidation,
  handleValidationErrors,
};
