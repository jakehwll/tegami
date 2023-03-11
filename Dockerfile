FROM node:18-alpine

# https://github.com/vercel/turbo/issues/2198
RUN apk add --no-cache libc6-compat

RUN yarn global add turbo

WORKDIR /usr/src/app

COPY ["yarn.lock", "package.json", "./"] 
COPY . .
RUN yarn install

EXPOSE 3000
CMD ["yarn", "dev"]