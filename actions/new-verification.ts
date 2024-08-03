"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
  const exisitingToken = await getVerificationTokenByToken(token);

  if (!exisitingToken) {
    return { error: "Token does Not Exists!" };
  }

  const hasExpired = new Date(exisitingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token Expired!" };
  }

  const exisitingUser = await getUserByEmail(exisitingToken.email);

  if (!exisitingUser) {
    return { error: "Email Does Not Exsits!" };
  }

  await db.user.update({
    where: { id: exisitingUser.id },
    data: {
      emailVerified: new Date(),
      email: exisitingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: exisitingToken.id },
  });

  return { success: "Email Verified!" };
};
