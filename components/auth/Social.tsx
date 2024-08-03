"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const onClick = (provider: "github" | "google") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        onClick={() => onClick("github")}
        size="lg"
        variant="outline"
        className="w-full"
      >
        <FaGithub className="h-5 w-5" />
      </Button>
      <Button
        onClick={() => onClick("google")}
        size="lg"
        variant="outline"
        className="w-full"
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Social;
