var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors({ optionsSuccessStatus: 200 }));  
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// My code starts here

app.get("/api/:date", function(req, res) {
  let time = req.params.date;
  console.log(time)
  let date;
  if (/-/.test(time)) {
    date = new Date(time);
  } else {
    date = new Date(Number(time));
  }
  if (date == 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  } else {
    return res.json({ unix: date.valueOf(), utc: date.toUTCString() });
  }
});

app.get('/api', (req, res) => {
  return res.json({ unix: new Date().valueOf(), utc: new Date().toUTCString() });
});

// My code ends here

var listener = app.listen(5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
