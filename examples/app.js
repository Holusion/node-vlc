var readline = require('readline');
var Vlc = require('../vlc');
var EventEmitter = require('events').EventEmitter;
var VLCevent = new EventEmitter();

var vlc = new Vlc([
  '-I', 'dummy',
  '--no-video-title-show',
  '--logmode','syslog',
  '--syslog',
  '--syslog-facility','local7',

]);
var media = vlc.mediaFromFile(process.argv[2]);
media.parseSync();

media.track_info.forEach(function (info) {
  console.log(info);
});

console.log(media.artist, '--', media.album, '--', media.title);

var player = vlc.mediaplayer;
player.media = media;
console.log('Media duration:', media.duration);

player.play();


player.on('Paused',function(){
	console.log("paused");
});
player.on('EncounteredError',function(){

	console.log(vlc.errmsg());
	console.log("error")
})


setTimeout(function(){
	player.stop();
    media.release();
    vlc.release();
},10000)
