"use client";

import Link from "next/link";
import React from "react";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { buttonVariants } from "../ui/button";
import ModeToggle from "./ModeToggle";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const Navbar = () => {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();

  return (
    <div className="py-5 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/">
          <h1 className="text-3xl font-semibold">
            Blog<span className="text-blue-500">Greenteck</span>
          </h1>
        </Link>

        <div className="hidden sm:flex items-center gap-6">
          <Link href="/" className="text-md font-medium hover:text-blue-500 ">
            主页
          </Link>
          <Link
            href="/dashboard"
            className="text-md font-medium hover:text-blue-500 "
          >
            个人
          </Link>
          <Link
            href="/chat"
            className="text-md font-medium hover:text-blue-500 "
          >
            Ai
          </Link>
          <Link
            href="/chat"
            className="text-md font-medium hover:text-blue-500 "
          >
            性能监控
          </Link>
        </div>
      </div>

      {user ? (
        <div className="flex items-center gap-4">
          <ModeToggle></ModeToggle>
          <p>{user.given_name}</p>
          <LogoutLink className={buttonVariants()}>注销</LogoutLink>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <LoginLink className={buttonVariants()}>登录</LoginLink>
          <RegisterLink className={buttonVariants()}>注册</RegisterLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
