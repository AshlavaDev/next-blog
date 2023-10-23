import { NextResponse } from "next/server";

import prisma from "@/app/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.error();
  }

  const body = await req.json();

  const { title, description, content, imageSrc, altText } = body;

  const blog = await prisma.blog.create({
    data: {
      title,
      description,
      content,
      imageSrc,
      altText,
      userId: user.id,
    },
  });

  return NextResponse.json(blog);
}
