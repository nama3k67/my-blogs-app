import prisma from "@/shared/libs/prisma";

export async function getUser(id: number) {
  const user = await prisma.users.findUnique({
    where: { id },
  });

  return user;
}
