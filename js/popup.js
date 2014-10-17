var apiUrl = 'https://api.twitch.tv/kraken/',
		streamsUrl = apiUrl + 'streams?game=League+of+Legends&limit=20'

var container = document.getElementById('streamsContainer');

function getStreams(cb){

	var req = new XMLHttpRequest();

	req.onreadystatechange = function (){
		if(this.readyState === 4)
			return cb(null, JSON.parse(this.response));
	};

	req.onabort = function (){
		return cb('request aborted');
	};

	req.open('GET', streamsUrl, true);
	req.send();
}

function drawStream(stream){
	var node = '';


	node += stream.viewers;
	node += '<hr>';

	container.innerHTML += node;

}

function handleStreams(err, streamObj){

	if(err) return container.innerHTML = 'Could not GET streams!';

	container.innerHTML = '';
	streamObj.streams.forEach(drawStream);

}


getStreams(handleStreams);