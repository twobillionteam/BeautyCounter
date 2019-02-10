FROM node:10

WORKDIR /usr/app

COPY package.json .
RUN npm install --production

COPY . .

ENV API_PORT=3000

EXPOSE 3000
CMD ["node", "server.js"]