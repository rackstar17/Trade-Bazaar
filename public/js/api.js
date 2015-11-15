var mongo = require('mongodb').MongoClient;

module.exports = function(app,express) {
    var api = express.Router();
    mongo.connect('mongodb://127.0.0.1/indianstocks',function(err,db) {
        if(err) throw err;
        console.log('connected to the database');

        var stocks_collection = db.collection('stocks');

        api.get('/stockget', function(req,res) {
            stocks_collection.find().toArray(function(err,stocks) {
                if(err) throw err;
                res.json(stocks);
            });
        });
    });
    return api;
};