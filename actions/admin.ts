"use server";

import { currentRole } from "@/data/auth";
import { UserRole } from "@prisma/client";

export const admin = async () => {
  const role = await currentRole();
  if (role === UserRole.ADMIN) {
    return { success: "Allowed" };
  }
  return { error: "ForBidden" };
};
