const ErrorCode = require("@/common/ErrorCode");
const ResultUtils = require("@/common/ResultUtils");
const BusinessException = require("@/common/BusinessException");
const prisma = require("../prisma");

// 辅助函数：安全解析 tags JSON
function parseTags(tags) {
  if (!tags) return [];
  try {
    return JSON.parse(tags);
  } catch (e) {
    // 如果不是有效 JSON，按逗号分割
    return tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
}

// 辅助函数：将 Question 转换为 VO
function toQuestionVO(question, user) {
  return {
    id: Number(question.id),
    title: question.title,
    content: question.content,
    tags: parseTags(question.tags),
    answer: question.answer,
    userId: Number(question.userId),
    createTime: question.createTime,
    updateTime: question.updateTime,
    user: user
      ? {
          id: Number(user.id),
          userName: user.userName,
          userAvatar: user.userAvatar,
        }
      : null,
  };
}

// 分页获取题目 VO 列表处理器
async function listQuestionPageVOHandler(req, res, next) {
  try {
    const {
      current: rawCurrent = 1,
      pageSize: rawPageSize = 10,
      title,
      tags,
      questionBankId,
      sortField,
      sortOrder,
    } = req.body;
    const current = parseInt(rawCurrent, 10);
    const pageSize = parseInt(rawPageSize, 10);

    if (pageSize > 20) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR);
    }

    const where = { isDelete: 0 };
    if (title) where.title = { contains: title };

    // 如果指定了题库 ID
    if (questionBankId) {
      const relations = await prisma.questionBankQuestion.findMany({
        where: { questionBankId: BigInt(questionBankId) },
        select: { questionId: true },
      });
      const questionIds = relations.map((r) => r.questionId);
      where.id = { in: questionIds };
    }

    const orderBy = {};
    if (sortField) {
      orderBy[sortField] = sortOrder === "ascend" ? "asc" : "desc";
    } else {
      orderBy.createTime = "desc";
    }

    const total = await prisma.question.count({ where });
    const questions = await prisma.question.findMany({
      where,
      skip: (current - 1) * pageSize,
      take: pageSize,
      orderBy,
      include: { user: true },
    });

    const records = questions.map((q) => toQuestionVO(q, q.user));

    res.json(
      ResultUtils.success(
        ResultUtils.page(records, total, current, pageSize),
        "获取题目列表成功",
      ),
    );
  } catch (error) {
    next(error);
  }
}

// 搜索题目处理器
async function searchQuestionPageVOHandler(req, res, next) {
  try {
    const {
      current: rawCurrent = 1,
      pageSize: rawPageSize = 10,
      searchText,
      title,
      tags,
      sortField,
      sortOrder,
    } = req.body;
    const current = parseInt(rawCurrent, 10);
    const pageSize = parseInt(rawPageSize, 10);
    if (pageSize > 200) {
      throw new BusinessException(
        ErrorCode.PARAMS_ERROR,
        "pageSize 不能超过 200",
      );
    }
    const where = { isDelete: 0 };
    if (searchText) {
      where.OR = [
        { title: { contains: searchText } },
        { content: { contains: searchText } },
        { answer: { contains: searchText } },
      ];
    }
    if (title) where.title = { contains: title };
    const orderBy = {};
    if (sortField) {
      orderBy[sortField] = sortOrder === "ascend" ? "asc" : "desc";
    } else {
      orderBy.createTime = "desc";
    }
    const total = await prisma.question.count({ where });
    const questions = await prisma.question.findMany({
      where,
      skip: (current - 1) * pageSize,
      take: pageSize,
      orderBy,
      include: { user: true },
    });
    const records = questions.map((q) => toQuestionVO(q, q.user));
    res.json(
      ResultUtils.success(
        ResultUtils.page(records, total, current, pageSize),
        "搜索题目成功",
      ),
    );
  } catch (error) {
    next(error);
  }
}

// 根据id获取题目vo处理器
async function getQuestionVOHandler(req, res, next) {
  try {
    const { id } = req.query;
    (console.log("id"), id);

    if (!id || id <= 0) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR, "题目id不能为空");
    }
    const question = await prisma.question.findFirst({
      where: { id: Number(id), isDelete: 0 },
      include: { user: true },
    });
    if (!question) {
      throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "题目不存在");
    }
    res.json(
      ResultUtils.success(
        toQuestionVO(question, question.user),
        "获取题目成功",
      ),
    );
  } catch (error) {
    next(error);
  }
}

const questionHandler = {
  listQuestionPageVOHandler,
  searchQuestionPageVOHandler,
  getQuestionVOHandler,
};

module.exports = questionHandler;
