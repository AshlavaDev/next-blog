import { NextResponse } from "next/server";

import prisma from "@/app/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const body = await req.json();

  const { name, description, imageSrc } = body;

  const blog = await prisma.blog.create({
    data: {
      name,
      description,
      imageSrc,
      userId: user.id,
    },
  });

  return NextResponse.json(blog);
}
