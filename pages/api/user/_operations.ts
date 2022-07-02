import { Prisma } from "@prisma/client";
import prisma from "@db";

export async function _existsUser(args: Prisma.UserWhereUniqueInput) {
  const result = await prisma.user.findUnique({
    select: {
      id: true,
    },
    where: args,
  });

  if (result) {
    return true;
  }

  return false;
}

export async function _createUser(args: Prisma.UserCreateArgs) {
  return await prisma.user.create(args);
}

export async function _getUser(args: Prisma.UserFindUniqueArgs) {
  return await prisma.user.findUnique(args);
}

export async function _getManyUser(args: Prisma.UserFindManyArgs) {
  return await prisma.user.findMany(args);
}

export async function _upsertUser(args: Prisma.UserUpsertArgs) {
  return await prisma.user.upsert(args);
}

export async function _updateUser(args: Prisma.UserUpdateArgs) {
  return await prisma.user.update(args);
}

export async function _updateManyUser(args: Prisma.UserUpdateManyArgs) {
  return await prisma.user.updateMany(args);
}

export async function _deleteUser(args: Prisma.UserDeleteArgs) {
  return await prisma.user.delete(args);
}

export async function _deleteManyUser(args: Prisma.UserDeleteManyArgs) {
  return await prisma.user.deleteMany(args);
}
