var API_URL = 'https://api.twitch.tv/kraken/',
		STREAMS_URL = API_URL + 'streams?game=League+of+Legends&limit=20'


var container = document.getElementById('streamsContainer');


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


function handleStreams(err, streamObj){

	if(err) return container.innerHTML = 'Could not GET streams, '
		+ 're-open extension to retry';

	container.innerHTML = '';
	streamObj.streams.forEach(drawStream);

	// Stupid scrollbar invis re-hack
	window.scrollTo(0,0);
}


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


getStreams(handleStreams);