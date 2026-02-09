require("module-alias/register");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const Redis = require("ioredis");
const morgan = require("morgan");
// 错误中间件
const { errorHandler } = require("@/middleware/errorHandler");

const userRouter = require("@/routes/user");
const questionBankQuestionRouter = require("@/routes/questionBankQuestion");
const questionBankRouter = require("@/routes/questionBank");
// 全局处理 BigInt 序列化
BigInt.prototype.toJSON = function () {
  return this.toString();
};

const app = express();
const PORT = process.env.PORT || 3000;
// Redis 客户端
const redisClient = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
});

// 中间件配置
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Session 配置 (使用 Redis 存储)
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret:
      process.env.SESSION_SECRET || "87436f3f-8861-45bf-8535-e24867e343cf",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 天
      httpOnly: true,
      secure: false,
    },
    name: "frontend_tiny_bank",
  }),
);
// 导出 Redis 客户端供其他模块使用
app.locals.redisClient = redisClient;
app.use(morgan("dev"));
// api路由
app.use("/api/user", userRouter);
app.use("/api/questionBankQuestion", questionBankQuestionRouter);
app.use("/api/questionBank", questionBankRouter);

// 全局错误处理
app.use(errorHandler);

// 启动服务
app.listen(PORT, "0.0.0.0", () => {
  console.log(`服务已启动: http://localhost:${PORT}/api`);
});

module.exports = app;
