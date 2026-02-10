import { createBrowserRouter } from "react-router";
import App from "@/App";
import HomePage from "@/pages/HomePage";
import BanksPage from "@/pages/BanksPage";
import QuestionsPage from "@/pages/QuestionsPage";
import BankDetailPage from "@/pages/BankDetailPage";
import QuestionDetailPage from "@/pages/QuestionDetailPage";
import BankQuestionPage from "@/pages/BankQuestionPage";
import LoginPage from "@/pages/user/LoginPage";
import RegisterPage from "@/pages/user/RegisterPage";
import UserCenterPage from "@/pages/user/UserCenterPage";
import UserAdminPage from "@/pages/admin/UserAdminPage";
import BankAdminPage from "@/pages/admin/BankAdminPage";
import QuestionAdminPage from "@/pages/admin/QuestionAdminPage";
import Forbidden from "@/pages/Forbidden";
import NotFound from "@/pages/NotFound";
const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "banks",
        element: <BanksPage />,
      },
      {
        path: "questions",
        element: <QuestionsPage />,
      },
      {
        path: "bank/:questionBankId",
        element: <BankDetailPage />,
      },
      {
        path: "question/:questionId",
        element: <QuestionDetailPage />,
      },
      {
        path: "bank/:questionBankId/question/:questionId",
        element: <BankQuestionPage />,
      },
      {
        path: "user/login",
        element: <LoginPage />,
      },
      {
        path: "user/register",
        element: <RegisterPage />,
      },
      {
        path: "user/center",
        element: <UserCenterPage />,
      },
      {
        path: "admin/user",
        element: <UserAdminPage />,
      },
      {
        path: "admin/bank",
        element: <BankAdminPage />,
      },
      {
        path: "admin/question",
        element: <QuestionAdminPage />,
      },
      {
        path: "forbidden",
        element: <Forbidden />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
