const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const app=express();
const https=require("https");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
 res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res){
    const fname=req.body.firstname;
    const lname=req.body.lastname;
    const mail=req.body.email;
    // console.log(fname,lname,mail);
    // const data={
    //  'members': [
    //     {
    //         email_address:mail,
    //         status:"subscribed",
    //         merge_fields:
    //         {
    //             FNAME:fname,
    //             LNAME:lname
    //         }
    //     }
    //  ],
    // }
    var data = {
        'members': [
          {
          email_address: mail,
          status: 'subscribed',
          merge_fields: {
            FNAME: fname,
            LNAME: lname
            }
          }
        ],
      }
    const JSONData=JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/2811f89690";
    const options={
        method:"POST",
        headers: {
      'Authorization': "omkarj 788344d7af871095b2525b51377d8b35-us21"
    },
        // auth:"omkar:788344d7af871095b2525b51377d8b35-us21"
    };

   const request= https.request(url,options,function(response)
   {
    response.on("data",function(response)
    {
     console.log(JSON.parse(JSON.stringify(data)));
    })
    // console.log(response.statusCode);
    if(response.statusCode === 200)
    {
        res.sendFile(__dirname + "/success.html")
    }
    else{
        res.sendFile(__dirname + "/failure.html")
    }
   })
 request.write(JSONData);
 request.end();
})

app.listen(process.env.PORT || 3000,function(req,res){
    console.log("server has been stated");
})