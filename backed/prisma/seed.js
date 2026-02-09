const { PrismaClient } = require("@prisma/client");
const crypto = require("crypto");

const prisma = new PrismaClient();

// 密码加密（与 Java 后端一致）
const SALT = "ebfbf057-c6bd-40f9-879e-a874be25b6b4";
function encryptPassword(password) {
  return crypto
    .createHash("md5")
    .update(SALT + password)
    .digest("hex");
}

async function main() {
  console.log("开始初始化数据...");

  // 清空现有数据（按顺序删除，避免外键约束）
  await prisma.questionBankQuestion.deleteMany();
  await prisma.question.deleteMany();
  await prisma.questionBank.deleteMany();
  await prisma.user.deleteMany();

  // 用户数据（密码是 12345678）
  const encryptedPassword = encryptPassword("12345678");

  const users = await prisma.user.createMany({
    data: [
      {
        id: 1,
        userAccount: "user1",
        userPassword: encryptedPassword,
        unionId: "unionId1",
        mpOpenId: "mpOpenId1",
        userName: "user1",
        userAvatar: "https://www.code-nav.cn/logo.png",
        userProfile: "喜欢编程的小白",
        userRole: "user",
      },
      {
        id: 2,
        userAccount: "user2",
        userPassword: encryptedPassword,
        unionId: "unionId2",
        mpOpenId: "mpOpenId2",
        userName: "user2",
        userAvatar: "https://www.code-nav.cn/logo.png",
        userProfile: "全栈开发工程师",
        userRole: "user",
      },
      {
        id: 3,
        userAccount: "user3",
        userPassword: encryptedPassword,
        unionId: "unionId3",
        mpOpenId: "mpOpenId3",
        userName: "user3",
        userAvatar: "https://www.code-nav.cn/logo.png",
        userProfile: "前端爱好者",
        userRole: "user",
      },
      {
        id: 4,
        userAccount: "user4",
        userPassword: encryptedPassword,
        unionId: "unionId4",
        mpOpenId: "mpOpenId4",
        userName: "user4",
        userAvatar: "https://www.code-nav.cn/logo.png",
        userProfile: "后端开发工程师",
        userRole: "user",
      },
      {
        id: 5,
        userAccount: "admin",
        userPassword: encryptedPassword,
        userName: "小莫莫",
        userAvatar:
          "https://lvyou-1332935562.cos.ap-nanjing.myqcloud.com/ceshi%2FIMG_1282.PNG",
        userProfile: "系统管理员",
        userRole: "admin",
      },
    ],
  });
  console.log(`创建了 ${users.count} 个用户`);

  // 题库数据
  const questionBanks = await prisma.questionBank.createMany({
    data: [
      {
        id: 1,
        title: "JavaScript 基础",
        description: "包含 JavaScript 的基础知识题目",
        picture:
          "https://pic.code-nav.cn/mianshiya/question_bank_picture/1777886594896760834/JldkWf9w_JavaScript.png",
        userId: 1,
      },
      {
        id: 2,
        title: "CSS 样式",
        description: "包含 CSS 相关的样式问题",
        picture:
          "https://pic.code-nav.cn/mianshiya/question_bank_picture/1777886594896760834/QatnFmEN_CSS.png",
        userId: 2,
      },
      {
        id: 3,
        title: "HTML 基础",
        description: "HTML 标记语言的基本知识",
        picture: "https://www.mianshiya.com/logo.png",
        userId: 3,
      },
      {
        id: 4,
        title: "前端框架",
        description: "React, Vue, Angular 等框架相关的题目",
        picture: "https://www.mianshiya.com/logo.png",
        userId: 1,
      },
      {
        id: 5,
        title: "算法与数据结构",
        description: "数据结构和算法题目",
        picture: "https://www.mianshiya.com/logo.png",
        userId: 2,
      },
      {
        id: 6,
        title: "数据库原理",
        description: "SQL 语句和数据库设计",
        picture: "https://www.mianshiya.com/logo.png",
        userId: 3,
      },
      {
        id: 7,
        title: "操作系统",
        description: "操作系统的基本概念",
        picture: "https://www.mianshiya.com/logo.png",
        userId: 1,
      },
      {
        id: 8,
        title: "网络协议",
        description: "HTTP, TCP/IP 等网络协议题目",
        picture: "https://www.mianshiya.com/logo.png",
        userId: 2,
      },
      {
        id: 9,
        title: "设计模式",
        description: "常见设计模式及其应用",
        picture: "https://www.mianshiya.com/logo.png",
        userId: 3,
      },
      {
        id: 10,
        title: "编程语言概述",
        description: "多种编程语言的基础知识",
        picture: "https://www.mianshiya.com/logo.png",
        userId: 1,
      },
      {
        id: 11,
        title: "版本控制",
        description: "Git 和 SVN 的使用",
        picture: "https://www.mianshiya.com/logo.png",
        userId: 2,
      },
      {
        id: 12,
        title: "安全与加密",
        description: "网络安全和加密技术",
        picture: "https://www.mianshiya.com/logo.png",
        userId: 3,
      },
      {
        id: 13,
        title: "云计算",
        description: "云服务和架构",
        picture: "https://www.mianshiya.com/logo.png",
        userId: 1,
      },
      {
        id: 14,
        title: "微服务架构",
        description: "微服务的设计与实现",
        picture: "https://www.mianshiya.com/logo.png",
        userId: 2,
      },
      {
        id: 15,
        title: "容器技术",
        description: "Docker 和 Kubernetes 相关知识",
        picture: "https://www.mianshiya.com/logo.png",
        userId: 3,
      },
      {
        id: 16,
        title: "DevOps 实践",
        description: "持续集成与持续交付",
        picture: "https://www.mianshiya.com/logo.png",
        userId: 1,
      },
      {
        id: 17,
        title: "数据分析",
        description: "数据分析和可视化",
        picture: "https://www.mianshiya.com/logo.png",
        userId: 2,
      },
      {
        id: 18,
        title: "人工智能",
        description: "机器学习与深度学习基础",
        picture: "https://www.mianshiya.com/logo.png",
        userId: 3,
      },
      {
        id: 19,
        title: "区块链技术",
        description: "区块链的基本原理和应用",
        picture: "https://www.mianshiya.com/logo.png",
        userId: 1,
      },
      {
        id: 20,
        title: "项目管理",
        description: "软件开发项目的管理和执行",
        picture: "https://www.mianshiya.com/logo.png",
        userId: 2,
      },
    ],
  });
  console.log(`创建了 ${questionBanks.count} 个题库`);

  // 题目数据
  const questions = await prisma.question.createMany({
    data: [
      {
        id: 1,
        title: "JavaScript 变量提升",
        content: "请解释 JavaScript 中的变量提升现象。",
        tags: '["JavaScript", "基础"]',
        answer:
          "变量提升是指在 JavaScript 中，变量声明会被提升到作用域的顶部。",
        userId: 1,
      },
      {
        id: 2,
        title: "CSS Flexbox 布局",
        content: "如何使用 CSS 实现一个水平居中的盒子？",
        tags: '["CSS", "布局"]',
        answer:
          "可以使用 Flexbox 布局，通过设置父容器 display 为 flex，并使用 justify-content: center; 对齐子元素。",
        userId: 2,
      },
      {
        id: 3,
        title: "HTML 中的语义化",
        content: "什么是 HTML 的语义化？为什么重要？",
        tags: '["HTML", "语义化"]',
        answer:
          "HTML 语义化是使用正确的标签来描述内容的意义，能够提高可访问性和 SEO 效果。",
        userId: 3,
      },
      {
        id: 4,
        title: "React 中的状态管理",
        content: "如何在 React 中管理组件状态？",
        tags: '["React", "状态管理"]',
        answer:
          "可以使用 React 的 useState 或 useReducer 钩子来管理组件状态，或使用 Redux 进行全局状态管理。",
        userId: 1,
      },
      {
        id: 5,
        title: "算法：二分查找",
        content: "请实现一个二分查找算法。",
        tags: '["算法", "数据结构"]',
        answer:
          "二分查找是一种在有序数组中查找特定元素的算法，通过不断折半的方式缩小查找范围。",
        userId: 2,
      },
      {
        id: 6,
        title: "数据库索引的作用",
        content: "什么是数据库索引？它的作用是什么？",
        tags: '["数据库", "索引"]',
        answer:
          "数据库索引是用于加快查询速度的数据结构，它通过优化查找路径减少查询时间。",
        userId: 3,
      },
      {
        id: 7,
        title: "HTTP 与 HTTPS 的区别",
        content: "请解释 HTTP 和 HTTPS 之间的主要区别。",
        tags: '["网络", "协议"]',
        answer: "HTTPS 是加密的 HTTP，通过 SSL/TLS 提供更安全的数据传输。",
        userId: 1,
      },
      {
        id: 8,
        title: "设计模式：单例模式",
        content: "请解释单例模式的实现及应用场景。",
        tags: '["设计模式", "单例"]',
        answer:
          "单例模式确保一个类只有一个实例，并提供全局访问点。常用于配置类等只需一个实例的场景。",
        userId: 2,
      },
      {
        id: 9,
        title: "Git 中的分支管理",
        content: "如何在 Git 中管理分支？",
        tags: '["版本控制", "Git"]',
        answer:
          "Git 中通过 branch 命令创建分支，使用 checkout 切换分支，使用 merge 合并分支。",
        userId: 3,
      },
      {
        id: 10,
        title: "Docker 的基本命令",
        content: "列举并解释几个常用的 Docker 命令。",
        tags: '["容器技术", "Docker"]',
        answer:
          "常用命令包括 docker run, docker build, docker ps, docker stop 等。",
        userId: 1,
      },
      {
        id: 11,
        title: "前端性能优化",
        content: "列举几个前端性能优化的手段。",
        tags: '["前端", "性能优化"]',
        answer: "包括代码分割、资源压缩、缓存策略、懒加载等。",
        userId: 2,
      },
      {
        id: 12,
        title: "JavaScript 闭包的应用",
        content: "什么是闭包？举例说明闭包的实际应用。",
        tags: '["JavaScript", "高级"]',
        answer:
          "闭包是指函数能够记住创建时的上下文环境，常用于数据隐藏和模块化编程。",
        userId: 3,
      },
      {
        id: 13,
        title: "数据库事务的特性",
        content: "请解释数据库事务的 ACID 特性。",
        tags: '["数据库", "事务"]',
        answer:
          "ACID 代表原子性、一致性、隔离性和持久性，是事务处理的四大特性。",
        userId: 1,
      },
      {
        id: 14,
        title: "CSS 的 BEM 命名规范",
        content: "什么是 BEM？如何使用 BEM 进行 CSS 命名？",
        tags: '["CSS", "命名规范"]',
        answer:
          "BEM 代表块（Block）、元素（Element）和修饰符（Modifier），是一种 CSS 命名规范。",
        userId: 2,
      },
      {
        id: 15,
        title: "JavaScript 原型链",
        content: "请解释 JavaScript 中的原型链机制。",
        tags: '["JavaScript", "原型链"]',
        answer:
          "原型链是 JavaScript 实现继承的机制，对象通过原型链可以继承其他对象的属性和方法。",
        userId: 3,
      },
      {
        id: 16,
        title: "React 生命周期",
        content: "请说明 React 组件的生命周期方法。",
        tags: '["React", "生命周期"]',
        answer:
          "React 组件的生命周期包括初始化、更新和卸载三个阶段，各阶段有不同的生命周期方法。",
        userId: 1,
      },
      {
        id: 17,
        title: "HTTP 状态码 404 与 500 的区别",
        content: "请解释 HTTP 状态码 404 和 500 的含义。",
        tags: '["网络", "HTTP"]',
        answer: "404 表示未找到资源，500 表示服务器内部错误。",
        userId: 2,
      },
      {
        id: 18,
        title: "Python 与 Java 的区别",
        content: "比较 Python 和 Java 的主要区别。",
        tags: '["编程语言", "Python", "Java"]',
        answer:
          "Python 是动态类型语言，语法简洁，而 Java 是静态类型语言，注重严谨性和性能。",
        userId: 3,
      },
      {
        id: 19,
        title: "Vue 的双向数据绑定",
        content: "请解释 Vue.js 是如何实现双向数据绑定的。",
        tags: '["Vue", "数据绑定"]',
        answer: "Vue.js 通过数据劫持和发布-订阅模式实现了双向数据绑定。",
        userId: 1,
      },
      {
        id: 20,
        title: "前端工程化的意义",
        content: "为什么需要前端工程化？",
        tags: '["前端", "工程化"]',
        answer:
          "前端工程化能够提高开发效率、代码质量和可维护性，规范开发流程。",
        userId: 2,
      },
    ],
  });
  console.log(`创建了 ${questions.count} 道题目`);

  // 题库题目关联数据
  const relations = await prisma.questionBankQuestion.createMany({
    data: [
      { questionBankId: 1, questionId: 1, userId: 1 },
      { questionBankId: 1, questionId: 2, userId: 1 },
      { questionBankId: 1, questionId: 3, userId: 1 },
      { questionBankId: 1, questionId: 4, userId: 1 },
      { questionBankId: 1, questionId: 5, userId: 1 },
      { questionBankId: 1, questionId: 6, userId: 1 },
      { questionBankId: 1, questionId: 7, userId: 1 },
      { questionBankId: 1, questionId: 8, userId: 1 },
      { questionBankId: 1, questionId: 9, userId: 1 },
      { questionBankId: 1, questionId: 10, userId: 1 },
      { questionBankId: 2, questionId: 2, userId: 2 },
      { questionBankId: 2, questionId: 14, userId: 2 },
      { questionBankId: 3, questionId: 3, userId: 3 },
      { questionBankId: 3, questionId: 13, userId: 3 },
      { questionBankId: 4, questionId: 4, userId: 1 },
      { questionBankId: 4, questionId: 16, userId: 1 },
      { questionBankId: 5, questionId: 5, userId: 2 },
      { questionBankId: 5, questionId: 18, userId: 2 },
      { questionBankId: 6, questionId: 6, userId: 3 },
      { questionBankId: 6, questionId: 19, userId: 3 },
      { questionBankId: 7, questionId: 7, userId: 1 },
      { questionBankId: 7, questionId: 11, userId: 1 },
      { questionBankId: 8, questionId: 8, userId: 2 },
      { questionBankId: 8, questionId: 10, userId: 2 },
      { questionBankId: 9, questionId: 9, userId: 3 },
      { questionBankId: 9, questionId: 17, userId: 3 },
      { questionBankId: 10, questionId: 12, userId: 1 },
      { questionBankId: 10, questionId: 20, userId: 1 },
    ],
  });
  console.log(`创建了 ${relations.count} 个题库题目关联`);

  console.log("数据初始化完成！");
  console.log("管理员账号: admin, 密码: 12345678");
}

main()
  .catch((e) => {
    console.error("初始化失败:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
