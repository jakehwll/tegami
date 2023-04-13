import { PrismaClient } from "@prisma/client"
import Parser from "rss-parser";

const database = new PrismaClient({
  log: [
    {
      emit: "stdout",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "stdout",
      level: "info",
    },
    {
      emit: "stdout",
      level: "warn",
    },
  ],
})

const scrape = async () => {
  const parser = new Parser()
  const feeds = await database.feed.findMany({})

  ;(async () => {
    feeds.forEach(async (feed) => {
      let externalFeed = await parser.parseURL(feed.feedUrl)

      const created = await Promise.all(
        externalFeed.items.map(async (item) => {
          if (!item.isoDate || new Date(item.isoDate) <= feed.publishedAt) {
            return
          }
          return await database.entry.create({
            data: {
              title: item.title,
              description: item.description,
              published: new Date(item.isoDate),
              feedId: feed.id,
              url: item.link ?? "",
            },
          })
        }),
      ).then((x) => {
        return x
          .filter((x) => x !== undefined)
          .sort((a, b) => a!.published.getTime() - b!.published.getTime())
      })

      if (created && created.length > 0) {
        const lastPost = created[created.length - 1]
        if (!lastPost) return
        await database.feed.update({
          where: {
            id: feed.id,
          },
          data: {
            publishedAt: lastPost.published,
          },
        })
      }
    })
  })()
}

const main = async () => {
  await scrape()
}

main()
