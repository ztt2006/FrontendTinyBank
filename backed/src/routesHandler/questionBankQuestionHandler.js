const ErrorCode = require("@/common/ErrorCode");
const ResultUtils = require("@/common/ResultUtils");
const BusinessException = require("@/common/BusinessException");
const prisma = require("../prisma");

// 辅助函数：将 QuestionBankQuestion 转换为 VO
function toQuestionBankQuestionVO(relation, user) {
  return {
    id: Number(relation.id),
    questionBankId: Number(relation.questionBankId),
    questionId: Number(relation.questionId),
    userId: Number(relation.userId),
    createTime: relation.createTime,
    updateTime: relation.updateTime,
    user: user
      ? {
          id: Number(user.id),
          userName: user.userName,
          userAvatar: user.userAvatar,
        }
      : null,
  };
}

const listQuestionBankQuestionPageVOHandler = async (req, res, next) => {
  try {
    const {
      current: rawCurrent = 1,
      pageSize: rawPageSize = 10,
      questionBankId,
      questionId,
    } = req.body;
    const current = Number(rawCurrent);
    const pageSize = Number(rawPageSize);
    if (pageSize > 20) {
      throw new BusinessException(
        ErrorCode.PARAMS_ERROR,
        "单页数据不能超过20条",
      );
    }

    const where = {};
    if (questionBankId) {
      where.questionBankId = BigInt(questionBankId);
    }
    if (questionId) {
      where.questionId = BigInt(questionId);
    }
    const total = await prisma.questionBankQuestion.count({ where });
    const relations = await prisma.questionBankQuestion.findMany({
      where,
      skip: (current - 1) * pageSize,
      take: pageSize,
      orderBy: { createTime: "desc" },
      include: {
        user: true,
      },
    });
    const records = relations.map((r) => toQuestionBankQuestionVO(r, r.user));

    res
      .status(200)
      .json(
        ResultUtils.success(
          ResultUtils.page(records, total, current, pageSize),
          "获取题库题目关联列表成功",
        ),
      );
  } catch (error) {
    next(error);
  }
};

const questionBankQuestionHandler = {
  listQuestionBankQuestionPageVOHandler,
};

module.exports = questionBankQuestionHandler;
