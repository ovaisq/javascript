const express = require('express');
const client = require('twilio')(
  process.env.SID,
  process.env.AUTH
);

var listenPort = 3001;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/api/messages', async function (req, res) {
  res.header('Content-Type', 'application/json');
  try {
    client.messages
      .create({
        from: process.env.FROM,
        to: req.body.to,
        body: req.body.body
      })
      .then(() => {
        res.send(JSON.stringify({ success: true }));
      })
  } catch(err) {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    }
});

app.listen(listenPort, () =>
  console.log('Twilio API server is running on localhost:' + listenPort)
);
