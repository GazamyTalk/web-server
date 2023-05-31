FROM node:lts-alpine3.17

COPY . /app
WORKDIR /app

RUN npm install

CMD ["/bin/sh", "-c", "node index.js"]