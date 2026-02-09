const express = require("express");
const router = express.Router();

const questionBankHandler = require("@/routesHandler/questionBankHandler");

// 分页获取题库 VO 列表
router.post("/list/page/vo", questionBankHandler.listQuestionBankPageVOHandler);
module.exports = router;
