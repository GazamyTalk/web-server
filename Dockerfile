FROM node:17-alpine

COPY . /app
WORKDIR /app

RUN npm install
RUN cd client && npm install && npm run build

CMD ["/bin/sh", "-c", "node index.js"]