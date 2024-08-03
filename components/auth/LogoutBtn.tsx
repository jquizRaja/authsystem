"use client";

import { signOut } from "next-auth/react";

interface LogoutBtnProps {
  children: React.ReactNode;
}
const LogoutBtn = ({ children }: LogoutBtnProps) => {
  const onClick = () => {
    signOut();
  };
  return(
    <span onClick={onClick}>
      {children}
    </span>
  )
};

export default LogoutBtn;
