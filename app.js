const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https =require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;

    var data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstname,
                    LNAME : lastname
                }
            }
        ]
    };

    var jsondata = JSON.stringify(data);
    const url = "https://us8.api.mailchimp.com/3.0/lists/f7f35cde82";
    const options = {
        method : "POST",
        auth : "sagar:8b46947e1ab2c94ef93884b5d3ffd4f8-us8"
    };

    const request = https.request(url,options,function(response){

        if(response.statusCode==200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsondata);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});


app.listen(process.env.PORT || 3000,function(){
    console.log("server runs on 3000");
});

//8b46947e1ab2c94ef93884b5d3ffd4f8-us8\

//f7f35cde82