require("module-alias/register");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
// 错误中间件
const { errorHandler } = require("@/middleware/errorHandler");

const userRouter = require("@/routes/user");

const app = express();
const PORT = process.env.PORT || 3000;

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
app.use(morgan("dev"));
// api路由
app.use("/api/user", userRouter);

// 全局错误处理
app.use(errorHandler);

// 启动服务
app.listen(PORT, "0.0.0.0", () => {
  console.log(`服务已启动: http://localhost:${PORT}/api`);
});

module.exports = app;
