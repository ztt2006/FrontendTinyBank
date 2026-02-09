const ErrorCode = require("@/common/ErrorCode");
const ResultUtils = require("@/common/ResultUtils");
const BusinessException = require("@/common/BusinessException");
const prisma = require("../prisma");

// 辅助函数：将 QuestionBank 转换为 VO
function toQuestionBankVO(questionBank, user) {
  return {
    id: Number(questionBank.id),
    title: questionBank.title,
    description: questionBank.description,
    picture: questionBank.picture,
    userId: Number(questionBank.userId),
    createTime: questionBank.createTime,
    updateTime: questionBank.updateTime,
    user: user
      ? {
          id: Number(user.id),
          userName: user.userName,
          userAvatar: user.userAvatar,
        }
      : null,
  };
}

const listQuestionBankPageVOHandler = async (req, res, next) => {
  try {
    const {
      current: rawCurrent = 1,
      pageSize: rawPageSize = 10,
      title,
      sortField,
      sortOrder,
    } = req.body;
    const current = Number(rawCurrent);
    const pageSize = Number(rawPageSize);
    if (pageSize > 20) {
      throw new BusinessException(
        ErrorCode.PARAMS_ERROR,
        "单页数据不能超过20条",
      );
    }
    const where = { isDelete: 0 };
    if (title) {
      where.title = { contains: title };
    }
    const orderBy = {};
    if (sortField) {
      orderBy[sortField] = sortOrder === "ascend" ? "asc" : "desc";
    } else {
      orderBy.createTime = "desc";
    }
    const total = await prisma.questionBank.count({ where });
    const questionBanks = await prisma.questionBank.findMany({
      where,
      skip: (current - 1) * pageSize,
      take: pageSize,
      orderBy,
      include: {
        user: true,
      },
    });
    const records = questionBanks.map((qb) => toQuestionBankVO(qb, qb.user));
    res
      .status(200)
      .json(
        ResultUtils.success(
          ResultUtils.page(records, total, current, pageSize),
          "获取题库列表成功",
        ),
      );
  } catch (error) {
    next(error);
  }
};
const questionBankHandler = {
  listQuestionBankPageVOHandler,
};
module.exports = questionBankHandler;
