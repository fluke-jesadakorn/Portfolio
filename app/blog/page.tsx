import { prisma } from "@/lib/prisma";
import { cache } from "react";
import GetBlog from "./Components/GetBlog";

const fetchBlogs = cache(async () => {
  try {
    const blogs = await prisma.blog.findMany();
    return blogs;
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
});

export default async function GetBlogPage() {
  const blogs = await fetchBlogs();
  return <GetBlog blogs={blogs} />;
}
