const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var fName = req.body.firstName;
  var lName = req.body.lastName;
  var email = req.body.email;

  var data = {
    'members': [
      {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: fName,
        LNAME: lName
        }
      }
    ],
  }

  var jsonData = JSON.stringify(data)

  console.log(fName, lName, email);

  // NOTE: The API KEY BELOW HAS BEEN DISABLED ON MAILCHIMP
  //       AS THIS CODE WILL BE PUSHED TO PUBLIC GITHUB

  var options = {
    url: 'https://us21.api.mailchimp.com/3.0/lists/2811f89690',
    method: 'POST',
    headers: {
      'Authorization': "anand2 788344d7af871095b2525b51377d8b35-us21"
    },
    body: jsonData
  }

  request(options, function(error, response, body) {
    if (error) {
      console.log(error);
      res.sendFile(__dirname + "/failure.html");
    } else {
      if(response.statusCode == 200){
        res.sendFile(__dirname + "/success.html");
      }else{
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post("/failure.html", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running");
});