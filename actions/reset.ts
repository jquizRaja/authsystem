"use server";

import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "InValid Email Fields" };
  }

  const { email } = validatedFields.data;
  const exisitingUser = await getUserByEmail(email);

  if (!exisitingUser) {
    return { error: "Email not Found!" };
  }

  const passwordResetToken= await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  )

  return { success: "Reset-Password Email Sent!" };
};
