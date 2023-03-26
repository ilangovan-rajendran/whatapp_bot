const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(3000, () => console.log("Server listening on port 3000!"));

app.use(bodyParser.json())

app.get('/webhooks',  (req, res) => {
    console.log("request------" ,req);
    if (
      req.query['hub.mode'] == 'subscribe' &&
      req.query['hub.verify_token'] == 'HS_AUTH_07061984'
    ) {
      res.send(req.query['hub.challenge']);
    } else {
      res.sendStatus(400);
    }
});





