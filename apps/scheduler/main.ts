import Parser from 'rss-parser'
import database from './util/database';

const scrape = async () => {
  const parser = new Parser();
  const feeds = await database.feed.findMany({});

  (async () => {

    feeds.forEach(async (feed) => {
      let externalFeed = await parser.parseURL(feed.url);
      
      console.log(externalFeed)

      const created = await Promise.all(
        externalFeed.items.map(async (item) => {
          if (
            !item.isoDate ||
            new Date(item.isoDate) <= feed.lastPublished
          ) {
            return;
          }
          return await database.entry.create({
            data: {
              name: item.title,
              description: item.description,
              published: new Date(item.isoDate),
              feedId: feed.id,
            },
          });
        })
      ).then((x) => {
        return x
          .filter((x) => x !== undefined)
          .sort((a, b) => a!.published.getTime() - b!.published.getTime());
      });

      if ( created && created.length > 0 ) {
        const lastPost = created[created.length - 1];
        if ( !lastPost ) return
        await database.feed.update({
          where: {
            id: feed.id
          },
          data: {
            lastPublished: lastPost.published
          }
        })
      }
    });

  })();
}

const main = async () => {
  await scrape()
}

main();