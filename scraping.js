var request = require('request');
var cheerio = require('cheerio');
var mongo = require('mongodb').MongoClient;

var url = "http://www.marketonmobile.com/search.php";

var finalData = [],i= 0,moduloResult;

request(url, function(error,response,body) {
    if(!error) {
        console.log('successful');
        var $ = cheerio.load(body);
        var data = $(".table .row li");
        var stockData;
        data.each(function(i,data) {
            stockData = $(data).text();
            //console.log(stockData);
            finalData.push(stockData);
        });
    }
    else {
        console.log('sorry an error occured');
    }

    var stocks = [];


    function stockObject(name,BSE,NSE) {
        this.stockName = name;
        this.stockBSECode = BSE;
        this.stockNSECode = NSE;
    }

    var temp,stockName,stockBSECode,stockNSECode;

    for(i=0;i<finalData.length;i++) {
        moduloResult = (i+1)%3;
        if(moduloResult == 0) {
            stockNSECode = finalData[i];
            temp = new stockObject(stockName,stockBSECode,stockNSECode);
            stocks.push(temp);
        }
        if(moduloResult == 1) {
            stockName = finalData[i];
        }
        if(moduloResult == 2) {
            stockBSECode = finalData[i];
        }
    }

    var stocks_json = [];
    stocks_json = JSON.parse(JSON.stringify(stocks));
    //console.log(stocks_json); // stocks_json has all the company's stocks listed under bse and nse and their information in json format

    mongo.connect('mongodb://127.0.0.1/indianstocks', function(err,db) {
        if(err) throw err;
        var collection = db.collection('stocks');
        for(i=0;i<stocks_json.length;i++) {
            collection.insert({stockName:stocks_json[i].stockName , stockBSECode:stocks_json[i].stockBSECode , stockNSECode:stocks_json[i].stockNSECode}, function() {
             console.log('Stock Inserted');
             });
            //console.log(stocks_json[i].stockName + ' ' + stocks_json[i].stockBSECode + ' ' + stocks_json[i].stockNSECode);
        }
    });

});


