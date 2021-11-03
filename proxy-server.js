const express = require("express");
const uuid = require('uuid');
const url = require('url');
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  const queryObject = url.parse(req.url,true).query;
  console.log(queryObject);
  var sourceUrl = queryObject.s;
  
  const payload = {
      "writeKey": "6o5N9SIVqYqoGTkzJRnFK78hYWjpfJyI",
      "type": "page",
      "anonymousId": uuid.v4(),
      "event": "Github Tracking",
      "name": sourceUrl,
      "properties": {
          "Google Analytics": true,
          "title": sourceUrl,
          "url": sourceUrl
      }
  };

  const segmentUrl = `https://api.segment.io/v1/pixel/page?data=${Buffer.from(JSON.stringify(payload)).toString('base64')}`;
  
  res.redirect(segmentUrl);
});

app.listen(port, () => console.log(`App listening on port ${port}!`))