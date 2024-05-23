FROM node:20.12-buster-slim

COPY . /app
WORKDIR /app

RUN npm install

WORKDIR ./client
RUN npm install
RUN echo "REACT_APP_API_SERVER_URL=${DOMAIN_NAME}" > .env.production.local
RUN npm run build

WORKDIR /app
CMD ["/bin/sh", "-c", "node index.js"]