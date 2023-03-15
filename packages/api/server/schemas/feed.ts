import * as z from "zod";

export const createFeedSchema = z.object({
  name: z.string(),
  siteUrl: z.string().url(),
  feedUrl: z.string().url(),
});
