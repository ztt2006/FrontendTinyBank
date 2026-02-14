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
// 根据id获取题库VO
const getQuestionBankVOHandler = async (req, res, next) => {
  try {
    const { id, needQueryQuestionList, current = 1, pageSize = 10 } = req.query;
    if (!id || Number(id) <= 0) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR, "题库id不能为空");
    }

    const questionBank = await prisma.questionBank.findFirst({
      where: { id: Number(id), isDelete: 0 },
      include: {
        user: true,
      },
    });
    if (!questionBank) {
      throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "题库不存在");
    }
    const questionBankVO = toQuestionBankVO(questionBank, questionBank.user);
    // 是否需要查询题目列表
    if (needQueryQuestionList === "true") {
      // 查询关联的题目
      const relations = await prisma.questionBankQuestion.findMany({
        where: { questionBankId: Number(id) },
        select: {
          questionId: true,
        },
      });
      const questionIds = relations.map((rel) => rel.questionId);
      if (questionIds.length > 0) {
        const where = {
          id: {
            in: questionIds,
          },
          isDelete: 0,
        };
        const total = await prisma.question.count({ where });
        const questions = await prisma.question.findMany({
          where,
          skip: (Number(current) - 1) * Number(pageSize),
          take: Number(pageSize),
          orderBy: {
            createTime: "desc",
          },
          include: {
            user: true,
          },
        });
        const questionRecords = questions.map((q) => ({
          id: Number(q.id),
          title: q.title,
          content: q.content,
          tags: JSON.parse(q.tags || "[]"),
          answer: q.answer,
          userId: Number(q.userId),
          createTime: q.createTime,
          updateTime: q.updateTime,
          user: q.user
            ? {
                id: Number(q.user.id),
                userName: q.user.userName,
                userAvatar: q.user.userAvatar,
              }
            : null,
        }));
        questionBankVO.questionRecords = ResultUtils.page(
          questionRecords,
          total,
          Number(current),
          Number(pageSize),
        );
      } else {
        questionBankVO.questionRecords = ResultUtils.page(
          [],
          0,
          Number(current),
          Number(pageSize),
        );
      }
    }
    console.log("questionBankVO", questionBankVO);
    res.status(200).json(ResultUtils.success(questionBankVO, "获取题库VO成功"));
  } catch (error) {
    next(error);
  }
};
const questionBankHandler = {
  listQuestionBankPageVOHandler,
  getQuestionBankVOHandler,
};
module.exports = questionBankHandler;
