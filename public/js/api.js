var mongo = require('mongodb').MongoClient;

module.exports = function(app,express) {
    var api = express.Router();
    mongo.connect('mongodb://127.0.0.1/indianstocks',function(err,db) {
        if(err) throw err;
        console.log('connected to the database');

        var stocks_collection = db.collection('stocks');
        var userPortfolio = db.collection('portfolio');

        api.get('/stockget', function(req,res) {
            stocks_collection.find().toArray(function(err,stocks) {
                if(err) throw err;
                res.json(stocks);
            });
        });

        api.post('/stockpost', function(req,res) {
            stocks_collection.find({"stockName": req.body.stockName}).toArray(function(err,stock) {
             if(err) throw err;
             res.json(stock);
             });
        });

        api.post('/addStockToPortfolio', function(req,res) {
            userPortfolio.insert({stockName:req.body.stockName, stockBSECode:req.body.stockBSECode, stockNSECode:req.body.stockNSECode, quantity:req.body.quantity}, function() {
                console.log('stock inserted in the portfolio');
            });
        });

        api.get('/getPortfolio', function(req,res) {
            userPortfolio.find().toArray(function(err,portfolioStocks) {
                if(err) throw err;
                res.json(portfolioStocks);
            });
        });

    });
    return api;
};