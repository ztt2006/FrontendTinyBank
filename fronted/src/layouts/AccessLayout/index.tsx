import React from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { findAllMenuItemByPath } from "@/config/menu";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";
import Forbidden from "@/pages/Forbidden";
import type { RootState } from "@/stores";

const AccessLayout: React.FC<
  Readonly<{
    children?: React.ReactNode;
  }>
> = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const menu = findAllMenuItemByPath(pathname);
  const needAccess = menu?.access ?? ACCESS_ENUM.NOT_LOGIN;
  const canAccess = checkAccess(loginUser, needAccess);
  if (!canAccess) {
    return <Forbidden />;
  }
  return children;
};

export default AccessLayout;
