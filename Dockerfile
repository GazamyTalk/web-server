FROM node:lts-alpine3.17

COPY . /app
WORKDIR /app

RUN npm install
RUN cd client && npm install && npm run build

CMD ["/bin/sh", "-c", "node index.js"]