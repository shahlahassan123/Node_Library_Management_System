const express = require('express');
const app = express();

const path = require("path");
const bodyParser = require("body-parser");


//EXPRESS HANDLEBARS
const { engine } = require ('express-handlebars');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


app.use(express.static(path.join(__dirname,'public')));
app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//ROUTING
let routes = require('./routes/index');
app.use('/',routes);

//ERROR PAGE
app.use(function(req,res){
    res.status(404);
    res.render('errorView');
})

//PORT LISTENING
app.listen(8081,()=>{
    console.log("Server Listening.")
})