var blocks = { ad: 0, ga: 0, all: 0 },
		filter = { urls: ['<all_urls>'] },
		extras = ['blocking'];

var adList = [
	'doubleclick.net',
	'googleads',
	'googleadservices',
	'adzerk.net'
];


var gaList = [
	'google-analytics'
];



function onBeforeRequest(req){

	var cancelReq = false;

	adList.forEach(function (elem){
		if(req.url.indexOf(elem) !== -1){
			
			blocks.all += 1;
			blocks.ad += 1;

			cancelReq = true;
		}
	});

	gaList.forEach(function (elem){
		if(req.url.indexOf(elem) !== -1){

			blocks.ga += 1;
			blocks.all += 1;

			cancelReq = true;
		}
	});

	return { cancel: cancelReq };
};


/**
 * Add our onBeforeRequest listener function
 */
chrome.webRequest.onBeforeRequest.addListener(
	onBeforeRequest,
	filter,
	extras
);