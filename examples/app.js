var readline = require('readline');
var Vlc = require('../vlc');
var EventEmitter = require('events').EventEmitter;
var VLCevent = new EventEmitter();

var vlc = new Vlc([
  '-I', 'dummy',
  '--no-video-title-show',
]);

	var rl = readline.createInterface({
		input: process.stdin,
	  	output: process.stdout
	})

function Choose_Video(lien, pos)
{
	var media = vlc.mediaFromFile(lien);//ici le lien de la vidéo. mediaFromFile est une fonction dans le fichier vlc.js
	media.parseSync();

	media.track_info.forEach(function (info) {
	  console.log(info);
	});

	console.log(media.artist, '--', media.album, '--', media.title);

	var player = vlc.mediaplayer;
	player.media = media;
	console.log('Media duration:', media.duration);

	player.play();
	var POS = pos;
	player.position = POS;



	return {'1':player, '2':media};

}


function Video_Paused(player, media, POS)
{
	player.on('Paused',function(){
	    	PausedQuest(player, media, POS);
	});
}

function Video_Playing(player, media)
{
	player.on('Playing',function(){
		SecondQuest(player, media);
	});
}



function SecondQuest(player, media)
{
	rl.question("type q to exit or p to pause: ", function(answer) {
		if(answer=="q"){
			 player.stop();
			 media.release();
			 vlc.release();
			 rl.close();
		}
		else if (answer=="p"){
			player.pause();
		
		}
		else {
			console.log("\nYou're answer is not correct please try again!!");
			SecondQuest(player,media);
		}
	 
	});
}

function PausedQuest(player, media, POS)
{
	rl.question('type : \n q to exit \n b to return back to the Menu '+
		'\n c to continue playing \n r to replay \n ===> ', function(answer) {
			ans=answer;
			if(answer=="q"){
				 player.stop();
				 media.release();
				 vlc.release();
				 rl.close();
			}
			else if (answer=="r"){
			   player.stop();
			   player.play();
			}
			else if (answer=="c"){
			   player.play();
			}
			else if (answer == "b"){
			   Menu();
			}
			else{
			   console.log("\nYou're answer is not correct please try again!!");
			   PausedQuest(player, media, POS);
			}
		});
}



function Menu()
{
   rl.question("\t\t\tMENU \ntype 1 or 2 to see each video or q to exit : ", function(answer) {
	   switch (answer){
		case '1':
			var Dico = Choose_Video('/home/khamaily/Stage Holusion/mars.mp4',0.0);
			Video_Paused(Dico['1'], Dico['2'], 0.0);
			Video_Playing(Dico['1'], Dico['2'], 0.0);
			SecondQuest(Dico['1'], Dico['2']);
			break;
		case 'q':
			vlc.release();
			rl.close();
			break;
		case '2':
			var Dico = Choose_Video('/home/khamaily/Stage Holusion/test.mp4',0.0);
			Video_Paused(Dico['1'], Dico['2'], 0.0);
			Video_Playing(Dico['1'], Dico['2'], 0.0);
			SecondQuest(Dico['1'], Dico['2']);
			break;
		default:
			console.log("\nYou're answer is not correct please try again!!");
			Menu();
			break;
	   }
   });
}

Menu();

