import { User, Blog } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeBlog = Omit<Blog, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};
