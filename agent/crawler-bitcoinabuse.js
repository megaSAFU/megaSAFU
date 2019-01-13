var request = require("request");
module.exports = {
	crawl_address: function (api_endpoint, start, end, cb) {
		for (var i = start; i <= end; i++) {
			request({uri: `https://www.bitcoinabuse.com/reports/?page=${i}`}, function(error, response, body) {
				var regex = /\/reports\/([A-Za-z0-9]{34})/igm;
				var matches = body.match(regex);
				for (var mi = 0; mi < matches.length; mi++) {
					var address = matches[mi].substr(9);
					request.post({
						url: `http://localhost:3000${api_endpoint}`,
						json: {
							'source': 'bitcoinabuse',
							'address': address
						}
					}, function(error, response, body) {
					});
				}
			});
		}
	},
	crawl_reason: function (address) {
		request({uri: `https://www.bitcoinabuse.com/reports/${address}`}, function(error, response, body) {
			console.log('crawl_reason', body);
		});
	}
};
