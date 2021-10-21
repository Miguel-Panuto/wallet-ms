FROM node:14.16.1-alpine

WORKDIR /usr/local/app

COPY package.json .
COPY package-lock.json .

RUN npm install --silent --progress=false --production

COPY . .

EXPOSE 3001

ENTRYPOINT [ "npm", "start" ]