var express = require('express');
var app = express();
const router = express.Router()
app.use(express.json());
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


var redis = require('./database/redis');
var agent = require('./agent/agent');
var crawler_bitcoinabuse = require('./agent/crawler-bitcoinabuse');

crawler_bitcoinabuse.crawl_address('/api/internal/address', 1, 1);

// Public API endpoints
app.get('/api/query/*', function (req, res) {
	var address = req.originalUrl.substr(11);
	
});

app.post('/api/submit', function (req, res) {
	
});

// Internal API enpoints
app.post('/api/internal/address', function (req, res) {
	if (req.body.source == 'bitcoinabuse' && req.body.address.length == 34) {
		redis.internal.hset('bitcoinabuse', req.body.address);
	}
	res.end();
});


// Views
router.get('/submit', function (req, res) => {
	res.render('submit');
});

// Start the server
app.listen(3000, function () {
});
