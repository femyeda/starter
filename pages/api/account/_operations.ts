import { Prisma } from "@prisma/client";
import prisma from "@db";

export async function _existsAccount(args: Prisma.AccountWhereUniqueInput) {
  const result = await prisma.account.findUnique({
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

export async function _createAccount(args: Prisma.AccountCreateArgs) {
  return await prisma.account.create(args);
}

export async function _getAccount(args: Prisma.AccountFindUniqueArgs) {
  return await prisma.account.findUnique(args);
}

export async function _getManyAccount(args: Prisma.AccountFindManyArgs) {
  return await prisma.account.findMany(args);
}

export async function _upsertAccount(args: Prisma.AccountUpsertArgs) {
  return await prisma.account.upsert(args);
}

export async function _updateAccount(args: Prisma.AccountUpdateArgs) {
  return await prisma.account.update(args);
}

export async function _updateManyAccount(args: Prisma.AccountUpdateManyArgs) {
  return await prisma.account.updateMany(args);
}

export async function _deleteAccount(args: Prisma.AccountDeleteArgs) {
  return await prisma.account.delete(args);
}

export async function _deleteManyAccount(args: Prisma.AccountDeleteManyArgs) {
  return await prisma.account.deleteMany(args);
}
