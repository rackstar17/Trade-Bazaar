var express = require('express');
var bodyParser=require('body-parser');
var morgan=require('morgan');
var path = require('path');

var app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname,'public')));
var api = require('./public/js/api')(app,express);
app.use('/api',api);

app.get('/',function(req,res){
    res.sendFile(__dirname +'/public/index.html');
});


app.listen(4000, function(err) {
    if(err) {
        console.log(err);
    }
    else {
        console.log('listening on port 4000');
    }
});




