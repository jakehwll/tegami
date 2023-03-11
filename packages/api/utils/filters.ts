import { Prisma } from "database"

export enum FilterVariants {
  "unread",
  "starred",
  "history",
}

export type FilterVariantsType = {
  [key in FilterVariants]: Prisma.EntryWhereInput
}
