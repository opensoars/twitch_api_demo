(function (){

// Constants
var API_URL = 'https://api.twitch.tv/kraken/',
		LIMIT = 15,
		STREAMS_URL = API_URL + 'streams?game=League+of+Legends&limit=' + LIMIT;

// DOM
var container = document.getElementById('streamsContainer');


/**
 * Gets stream JSON data
 * 
 * @param cb {function}  To be called on finish/abort
 */
function getStreams(cb){

	container.innerHTML = 'Getting streams';

	var req = new XMLHttpRequest();

	req.onreadystatechange = function (){
		if(this.readyState === 4) return cb(null, JSON.parse(this.response));
	};

	req.onabort = function (){ return cb('request aborted'); };

	req.open('GET', STREAMS_URL, true);
	req.send();
}

/**
 * Handles the streamObj
 * Calls drawStream for each stream
 *
 * @param err       {string}  Error description
 * @param streamObj {object}  Contains all stream info
 */
function handleStreams(err, streamObj){

	if(err) return container.innerHTML = 'Could not GET streams, '
		+ 're-open extension to retry';

	container.innerHTML = '';
	streamObj.streams.forEach(drawStream);

	// Stupid scrollbar invis re-hack
	window.scrollTo(0,0);
}

/**
 * Draws stream info to container HTML
 *
 * @param stream {object}  Holds data for a single stream
 */
function drawStream(stream){
	var node = '';

	node += "<b><a target='_blank' href='" + stream.channel.url + "'>"
		+ stream.channel.display_name + "</a></b>";

	node += "<p>Viewers: " + stream.viewers + "</p>";

	node += "<p>" + stream.channel.status + "</p>";

	node += "<a target='_blank' href='" + stream.channel.url + "'>"
		+ "<img src='" + stream.preview.medium + "'></a>";

	node += "<hr><br>";

	container.innerHTML += node;
}

/**
 * Initialize
 * Calls getStreams and passes the handleStreams function
 * as a callback argument
 */
function init(){
	getStreams(handleStreams);
}

init();


}());