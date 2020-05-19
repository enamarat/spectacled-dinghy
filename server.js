// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

/********* My solution ****************/
//specific date is returned based on a user's input
app.get("/api/timestamp/:date_string", function(req, res) {
  // if user's input is invalid
  if (new Date(req.params.date_string).toString() === "Invalid Date") {
    res.json({
      error: "Invalid Date"
    });
  // if values in user's input are in valid format: "yyyy-mm-dd"
  } else {
    const regex = /\d+/;
    // if user's input is in format: "21213124..." (a bunch of digits), the program will assume it is a UNIX time format
    if (regex.test(req.params.date_string)) {
      res.json({ 
       unix: req.params.date_string, 
       utc: new Date(parseInt(req.params.date_string)).toUTCString() 
     });
    } 
    
    // if user's input is in format: "yyyy-mm-dd"
     res.json({
      unix: new Date(req.params.date_string).valueOf(),
      utc: new Date(req.params.date_string.valueOf()).toUTCString(),
      });
  }
});


// if no date is specified the current date is returned
app.get("/api/timestamp/", function(req, res) {
  res.json({ 
    // returns number of seconds which have passed since 1 january 1970
    unix: Date.now(), 
    // returns Date object
    utc: Date() 
  });
});
/*************************************************/

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
