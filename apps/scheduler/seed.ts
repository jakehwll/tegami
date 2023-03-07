import database from "./util/database";

const seed = async () => {
  const feed = {
    feedUrl: "https://guya.cubari.moe/read/other/rss/Kaguya-Wants-To-Be-Confessed-To",
    name: "Kaguya-sama: Love is War",
    siteUrl: "https://guya.moe/read/manga/Kaguya-Wants-To-Be-Confessed-To/",
    publishedAt: new Date(0),
  };
  await database.feed.upsert({
    where: {
      feedUrl: feed.feedUrl,
    },
    update: feed,
    create: feed,
  });
};

const main = async () => {
  await seed();
};

main();