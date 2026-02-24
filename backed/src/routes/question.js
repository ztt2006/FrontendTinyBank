const express = require("express");
const router = express.Router();

const questionHandler = require("@/routesHandler/questionHandler");

// 分页获取题目 VO 列表
router.post("/list/page/vo", questionHandler.listQuestionPageVOHandler);

// 搜索题目
router.post("/search/page/vo", questionHandler.searchQuestionPageVOHandler);

module.exports = router;
