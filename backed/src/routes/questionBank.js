const express = require("express");
const router = express.Router();

const questionBankHandler = require("@/routesHandler/questionBankHandler");

// 分页获取题库 VO 列表
router.post("/list/page/vo", questionBankHandler.listQuestionBankPageVOHandler);
router.get("/get/vo", questionBankHandler.getQuestionBankVOHandler);

module.exports = router;

// 根据Id获取题库VO