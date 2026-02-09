const express = require("express");
const router = express.Router();
const questionBankQuestionHandler = require("@/routesHandler/questionBankQuestionHandler");

// 分页获取题库题目关联列表
router.post(
  "/list/page/vo",
  questionBankQuestionHandler.listQuestionBankQuestionPageVOHandler,
);

module.exports = router;
