import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("vendorId") as string;
  const pageSize = req.nextUrl.searchParams.get("pageSize") as string;
  const query = req.nextUrl.searchParams.get("query") as string;
  const skip = (+page - 1) * +pageSize;

  const [records, total] = await Promise.all([
    prisma.vendor.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive", // Case-insensitive
            },
          },
          {
            address: {
              contains: query,
              mode: "insensitive",
            },
          },
          // Add other fields you want to include in the search
        ],
      },
      skip: skip,
      take: +pageSize,
      orderBy: {
        createdDate: "desc", // or any other field you want to sort by
      },
    }),
    prisma.vendor.count(),
  ]);

  console.log({ records, total });
  //     NextResponse.json({ records, total });
  NextResponse.json({ error: "Failed to fetch vendors" });
}
