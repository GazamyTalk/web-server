const express = require('express');
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const createClient = require("redis");
const app = express();
const config = {
    secret: process.env.SESSION_SECRET,
    storeUrl: process.env.SESSION_STORE_URL
}


let redisClient = createClient({ url: config.storeUrl });
redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "gazamytalk:",
});

app.use(session({
    secret: config.secret,
    name: 'sessionid',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 3600 * 100
    },
    store: redisStore
}))

