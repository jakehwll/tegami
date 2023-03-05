import Parser from 'rss-parser'
import database from './util/database';

const scrape = async () => {
  const parser = new Parser();
  const feeds = await database.feed.findMany({});

  (async () => {
    feeds.forEach(async (v) => {
      let feed = await parser.parseURL(v.url);
      console.log(feed.title);
      feed.items.forEach((item) => {
        console.log(item);
      });
    });
  })();
}

const main = async () => {
  await scrape()
}

main();