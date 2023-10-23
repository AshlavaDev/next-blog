import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/lib/prismadb";

export async function PUT(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { id } = currentUser;

  if (!id || typeof id !== "string") {
    throw new Error("Invalid user id");
  }

  const json = await req.json();

  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: json,
  });

  return NextResponse.json(user);
}
