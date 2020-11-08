const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fname,
        LNAME: lname
      }
    }]
  };
  var jsonData = JSON.stringify(data);
  var options = {
    url: "https://us17.api.mailchimp.com/3.0/lists/c699332a67",
    method: "POST",
    headers: {
      "Authorization": "konok 01f3ca31560d7caacbecc3782c012a5d-us17"
    },
    body: jsonData
  };
  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      }else{
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});
app.post("/failure", function(req, res){
 res.redirect("/");
});
app.listen(process.env.PORT || 3000, function() {
  console.log("running 3000");
});
// 01f3ca31560d7caacbecc3782c012a5d-us17
// c699332a67
