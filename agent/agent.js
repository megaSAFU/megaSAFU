module.exports = {
	crawler: {
		handle_address: function (redis_client, source, cb) {
			redis_client.subscribe(`${source}.queue.address.internal`);
			redis_client.cb[source] = cb;
		}
	}
};
