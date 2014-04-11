var readline = require('readline');
var Vlc = require('../vlc');
var EventEmitter = require('events').EventEmitter;
var VLCevent = new EventEmitter();

var vlc = new Vlc([
  '-I', 'dummy',
  '--no-video-title-show',
  "--loop"
]);

var rl = readline.createInterface({
		input: process.stdin,
	  	output: process.stdout
	})

var media = vlc.mediaFromFile(process.argv[2]);
media.parseSync();


var player = vlc.mediaplayer;
player.media = media;
console.log('Media duration:', media.duration);

player.play();
setTimeout(function(){
	console.log(player.position);
	var media2 = vlc.mediaFromFile(process.argv[3]);
		media2.parseSync();
		player.media=media2;	
		player.play();
		media.release();
	},(media.duration-5));

var count = 0;


player.on('Stopped',function(){
	console.log("stopped");
})
player.on('Forward',function(){
	console.log("Forward");
})



rl.question("type q to exit, n for next or p to pause: ", function(answer) {
	if(answer=="q"){
		 player.stop();
		 media.release();
		 vlc.release();
		 rl.close();
	}
	else if (answer=="p"){
		player.pause();
	
	}else if(answer == "n"){
		var media2 = vlc.mediaFromFile(process.argv[3]);
		media2.parseSync();
		player.media=media2;	
		player.play();
		media.release();
	}
	else {
		console.log("\nYou're answer is not correct please try again!!");
		SecondQuest(player,media);
	}
})
