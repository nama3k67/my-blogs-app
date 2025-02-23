import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUser(id: number) {
  const user = await prisma.users.findUnique({
    where: { id },
  });

  return user;
}
