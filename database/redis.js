var redis = require("redis");

// retry strategy for Redis
var retry_strategy = {
	retry_strategy: function (options) {
		if (options.error && options.error.code === 'ECONNREFUSED') {
			// End reconnecting on a specific error and flush all commands with
			// a individual error
			return new Error('The server refused the connection');
		}
		if (options.total_retry_time > 1000 * 60 * 60) {
			// End reconnecting after a specific timeout and flush all commands
			// with a individual error
			return new Error('Retry time exhausted');
		}
		if (options.attempt > 10) {
			// End reconnecting with built in error
			return undefined;
		}
		// reconnect after
		return Math.min(options.attempt * 100, 3000);
	}
};

// Internal uses db1
var internal = redis.createClient(retry_strategy);
internal.select(1);
internal.cb = {};
internal.on('message', function (channel, message) {
	if (internal.cb[channel] !== undefined) {
		internal.cb(message);
	}
});

// Public uses db2
var public = redis.createClient(retry_strategy);
public.select(2);

module.exports = {
	internal: internal,
	public: public
}
