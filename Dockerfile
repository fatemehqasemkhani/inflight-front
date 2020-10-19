FROM node:14
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
COPY . .
EXPOSE 3000
ENTRYPOINT ["yarn", "start"]