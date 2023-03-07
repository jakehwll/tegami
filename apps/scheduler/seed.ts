import database from "./util/database";

const seed = async () => {
  const feed = {
    url: "https://www.news.com.au/content-feeds/latest-news-technology/",
    name: "News.com.au",
    website: "https://www.news.com.au/technology",
    lastPublished: new Date(),
  };
  await database.feed.upsert({
    where: {
      url: feed.url,
    },
    update: feed,
    create: feed,
  });
};

const main = async () => {
  await seed();
};

main();