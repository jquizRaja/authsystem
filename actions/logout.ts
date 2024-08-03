"use server"

import { signOut } from "@/auth"

export const logout=async()=>{
  // somw server stuff
  await signOut();
}