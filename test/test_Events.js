
describe('Test events',function() {
	var vlc,
	media,
	player;
	before(function(){
		vlc = new VLC([
		  '-I', 'dummy',
		  '-V', 'dummy',
		  '--verbose', '1',
		  '--no-video-title-show',
		  '--no-disable-screensaver',
		  '--no-snapshot-preview',
		]);
		media = vlc.mediaFromFile('/home/khamaily/Stage Holusion/mars.mp4');
		media.parseSync();
		player = vlc.mediaplayer;
		player.media = media;
	})
	after(function(){
		vlc.release();
	})
	it('should emit a pause event', function(done){
		var eventFired = false;
	    	player.on('Paused',function(){
	      		eventFired = true;
			expect(eventFired).to.equal(true);
			done();
	    	});
	    	//trigger the event	
		player.pause();
		
		
	});
	it('should emit a playing event', function(done){
		var eventFired = false;
	    	player.on('Playing',function(){
	      		eventFired = true;
					
			expect(eventFired).to.equal(true);	
			done();
	    	});
	    	//trigger the event	
		player.play();
		
		
		
	});
})
