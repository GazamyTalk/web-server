const express = require('express');
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const createClient = require("redis");
const path = require('path');
const app = express();
const config = {
    sessionSecret: process.env.SESSION_SECRET,
    sessionStoreUrl: process.env.SESSION_STORE_URL,
    port: process.env.SERVER_PORT ?? 80,
}


let redisClient = createClient({ url: config.sessionStoreUrl });
redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "gazamytalk:",
});

app.use('/static', express.static(path.join(__dirname, './client/build/static')));

app.use(session({
    secret: config.sessionSecret,
    name: 'sessionid',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 3600 * 100
    },
    store: redisStore
}));


app.get('/', (req, res) => {
    res.sendFile("./client/build/index.html");
});

app.get('/index.html', (req, res) => {
    res.sendFile("./client/build/index.html");
});

app.get('/asset-manifest.json', (req, res) => {
    res.sendFile("./client/build/asset-manifest.json");
});

app.get('/manifest.json', (req, res) => {
    res.sendFile("./client/build/manifest.json");
});

app.get('/robots.txt', (req, res) => {
    res.sendFile("./client/build/robots.txt");
});


app.listen(port, () => {
    console.log(`server is running at port ${port}`);
})