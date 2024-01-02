"use server";
import prisma from "@/lib/prisma";

export const saveBlog = async (data: any) => {
  const result = await prisma.blog.create({
    data: {
      title: data.title,
      content: data.content,
    },
  });
  console.log(result);
  return result;
};
