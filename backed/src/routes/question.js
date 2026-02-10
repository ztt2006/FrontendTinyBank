const express = require("express");
const router = express.Router();

const questionHandler = require("@/routesHandler/questionHandler");

// 分页获取题目 VO 列表
router.post("/list/page/vo", questionHandler.listQuestionPageVOHandler);

module.exports = router;
