import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/lib/prismadb";

interface IParams {
  blogId?: string;
}

export async function DELETE(
  req: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { blogId } = params;

  const blog = await prisma.blog.delete({
    where: {
      id: blogId,
      userId: currentUser.id,
    },
  })

  return NextResponse.json(blog);
}

export async function PUT(
  req: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { blogId } = params;

  if (!blogId || typeof blogId !== "string") {
    throw new Error("Invalid blod id");
  }

  const json = await req.json();

  const blog = await prisma.blog.update({
    where: {
      id: blogId
    },
    data: json
  })

  return NextResponse.json(blog);
}