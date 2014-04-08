var readline = require('readline');
var Vlc = require('../vlc');
var EventEmitter = require('events').EventEmitter;
var VLCevent = new EventEmitter();

var vlc = new Vlc([
  '-I', 'dummy',
  '--no-video-title-show',
]);

var media = vlc.mediaFromFile('/home/khamaily/Stage Holusion/mars.mp4');//ici le lien de la vidéo. mediaFromFile est une fonction dans le fichier vlc.js
media.parseSync(); 

media.track_info.forEach(function (info) {
  console.log(info);
});

console.log(media.artist, '--', media.album, '--', media.title);

var player = vlc.mediaplayer;
player.media = media;
console.log('Media duration:', media.duration);

player.play();
var POS = 0.5
player.position = POS;

var rl = readline.createInterface({
	input: process.stdin,
  	output: process.stdout
})

player.on('Paused',function(){
    	rl.question('type : \n q to exit \n n for the next vidéo \n c to continue playing \n r to replay \n ===> ', function(answer) {
		if(answer=="q"){
			 player.stop();
			 media.release();
			 vlc.release();
			 rl.close();
		}
		else if (answer=="r"){
		   player.position = POS;//revenir à la première position
		   player.play();
		   
		}
		else if (answer=="p"){
		   player.play();
		}
		else 
		{//answer=n
		   player.stop();
		   media.release();
		   media = vlc.mediaFromFile('/home/khamaily/Stage Holusion/mars.mp4');
		   media.parseSync(); 
		   media.track_info.forEach(function (info) {
		   console.log(info);});
		   player.play();
		}
		  });
});
rl.question("type q to exit or p to pause : ", function(answer) {
	if(answer=="q"){
		 player.stop();
		 media.release();
		 vlc.release();
		 rl.close();
	}
	else if (answer=="p"){
		player.pause();
		
	}
 
});
