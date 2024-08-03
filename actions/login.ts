"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { generateTwoFactorToken } from "@/lib/tokens";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "InValid Fields!" };
  }

  const { email, password, code } = validatedFields.data;

  const exisitingUser = await getUserByEmail(email);

  if (!exisitingUser || !exisitingUser.email || !exisitingUser.password) {
    return { error: "Email Does Not Exists!" };
  }

  if (!exisitingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      exisitingUser.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Re-Confirmation Email Sent!" };
  }

  if (exisitingUser.isTwoFactorEnabled && exisitingUser.email) {
    if (code) {
      // todo:verify code
      const twoFactorToken = await getTwoFactorTokenByEmail(
        exisitingUser.email
      );
      if (!twoFactorToken) {
        return { error: "InValid Code!" };
      }
      if (twoFactorToken.token !== code) {
        return { error: "InValid Code!" };
      }
      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) {
        return { error: "Code Expire!" };
      }
      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const exisitingConfirmation = await getTwoFactorConfirmationByUserId(
        exisitingUser.id
      );
      if (exisitingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: exisitingConfirmation.id },
        });
      }
      await db.twoFactorConfirmation.create({
        data: {
          userId: exisitingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(exisitingUser.email);

      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "InValid Credentials!" };
        default:
          return { error: "Something Went Wrong!" };
      }
    }
    throw error;
  }
};
