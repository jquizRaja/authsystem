"use server";

import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing Token!" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "InValid Fields!" };
  }

  const { password } = validatedFields.data;

  const exisitingToken = await getPasswordResetTokenByToken(token);

  if (!exisitingToken) {
    return { error: "InValid Token !" };
  }

  const hasExpired = new Date(exisitingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token Expired!" };
  }

  const exisitingUser = await getUserByEmail(exisitingToken.email);

  if (!exisitingUser) {
    return { error: "Email does not Exists!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: exisitingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: exisitingToken.id },
  });

  return { success: "Password Updated!🎈🎈" };
};
