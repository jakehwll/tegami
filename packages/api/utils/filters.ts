import { Prisma } from "database";

export enum FILTERS_TYPES {
  "unread",
  "starred",
  "history",
}

export type FILTERS_PROPS = {
  [key in FILTERS_TYPES]: Prisma.EntryWhereInput;
};
