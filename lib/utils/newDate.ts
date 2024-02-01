import { User } from "@prisma/client";

export const isNew = (data: any) => {
  const isNew =
    Date.now() - new Date(data?.createdAt).getTime() < 1000 * 60 * 60 * 24 * 1;

  if (isNew) {
    return isNew;
  }

  return false;
};
