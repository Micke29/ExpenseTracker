FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production
RUN npm install --prefix client
RUN npm run build --prefix client
RUN npm install pm2 -g

COPY . ./

EXPOSE 5000

CMD [ "pm2-runtime", "server.js" ]