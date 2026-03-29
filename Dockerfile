# syntax=docker/dockerfile:1

FROM node:22.22.2

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --omit=dev

COPY . .

CMD [ "npm", "start" ]
