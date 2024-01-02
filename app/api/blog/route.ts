import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST() {
  try {
    // const { name, email }: { email: string; name: string } = req.body;
    // console.log({ name, email });
    const user = await prisma.private.create({
      data: {
        name: "hi",
        email: "hello@g.com",
      },
    });
    console.log(user);
    return NextResponse.json(user);
  } catch (e) {
    return NextResponse.json(e);
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany();
    return NextResponse.json(blogs);
  } catch (e) {
    return NextResponse.json(e);
  } finally {
    await prisma.$disconnect();
  }
}
