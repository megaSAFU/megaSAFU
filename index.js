var express = require('express');
var app = express();
app.use(express.json());


var redis = require('./database/redis');
var agent = require('./agent/agent');
var crawler_bitcoinabuse = require('./agent/crawler-bitcoinabuse');

crawler_bitcoinabuse.crawl_address('/api/internal/address', 1, 1);

// Public API endpoints
app.get('/api/query/*', function (req, res) {
	var address = req.originalUrl.substr(11);
	
});

app.post('/api/submit', function (req, res) {
	res.send('Hello World!');
});

// Internal API enpoints
app.post('/api/internal/address', function (req, res) {
	if (req.body.source == 'bitcoinabuse' && req.body.address.length == 34) {
		redis.internal.hset('bitcoinabuse', req.body.address);
	}
	res.end();
});


app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
