

var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var User=require("./routes/upload")
 //var user = require("./routes/users");


app.use(express.static(__dirname+"/public"));


app.use(bodyParser.urlencoded({extended:true}));


//app.use(user);


app.get("/",(req,res)=>
{
    res.redirect("/classify");
    
});



app.use(User);

app.get("*",(req,res)=>
{
    res.render("notfound.ejs");
})



app.listen(process.env.PORT,process.env.IP,function(){
    
    console.log("App running , sir");
});