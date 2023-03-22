# 💌 tegami

> **Warning** Tegami is in a development-status. Nothing is guaranteed to be working. Use at your own risk.

Tegami enables you to set up RSS-feed scraping and reading.

- Hostable anywhere you can run a docker image.
- History-keeping of read items.
- Feed updates via a CRON-job.
- Protected by a username/password authentication system.

## Quickstart

The recommended deployment route is Docker.

```yaml
# docker-compose.yaml
version: "3"
services:
  app:
    image: ghcr.io/jakehwll/tegami
    environment:
      - NEXTAUTH_URL=http://CHANGE_ME
      - NEXTAUTH_SECRET=CHANGE_ME
      - DATABASE_URL="file:./prod.db"
    ports:
      - 3000:3000
    restart: unless-stopped
```

## Contributions

Contributions are welcome!

Find our list of contributors [here](https://github.com/jakehwll/tegami/graphs/contributors).
