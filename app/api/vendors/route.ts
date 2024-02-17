import { PrismaClient } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  // { params: { page, pageSize } }: { params: { page: string; pageSize: string } }
) {
  let page = req.nextUrl.searchParams.get("page") || 1;
  let pageSize = req.nextUrl.searchParams.get("pageSize") || 10;
  const skip = (+page - 1) * +pageSize;

  const [records, total] = await Promise.all([
    prisma.vendor.findMany({
      skip: skip,
      take: +pageSize,
      orderBy: {
        createdDate: "desc", // or any other field you want to sort by
      },
    }),
    prisma.vendor.count(),
  ]);
  return NextResponse.json({ records, total });
}

export async function POST(req: Request) {
  const {
    name,
    address,
    tel,
    juristicId,
    taxId,
    contactAddr,
    telContactAddr,
    staffId,
  } = await req.json();
  const newVendor = await prisma.vendor.create({
    data: {
      name,
      address,
      tel,
      juristicId,
      taxId,
      contactAddr,
      telContactAddr,
      staffId, // Assuming staffId is an integer
    },
  });
  return NextResponse.json(newVendor);
}

export async function PUT(req: Request) {
  // Update an existing vendor
  const { vendorId, ...data } = await req.json();
  const updatedVendor = await prisma.vendor.update({
    where: { vendorId: vendorId },
    data: data,
  });
  return NextResponse.json(updatedVendor);
}

export async function DELETE(req: NextRequest) {
  const vendorId = req.nextUrl.searchParams.get("vendorId") as string;

  await prisma.vendor.delete({
    where: { vendorId },
  });
  return NextResponse.json({ message: "Vendor deleted" });
}
