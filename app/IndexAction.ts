"use server";
import prisma from "@/lib/prisma";

export const serverActions = async (formData: FormData) => {
//   const username = formData.get("username");
  const result = await prisma.private.findMany();
  console.log(result);
  return result
};

