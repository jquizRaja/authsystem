import NextAuth, { type DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";

export type ExtendedUser =
  | (DefaultSession & User)
  | (AdapterUser & {
      id: string;
      role:UserRole;
      isTwoFactorEnabled: boolean;
      isOAuth: boolean;
    });

declare module "next-auth" {
  interface Session {
    user: User| AdapterUser |ExtendedUser
  }
}
