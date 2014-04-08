describe('media player creation and destruction tests',function() {
	var vlc;
	before(function(){
		vlc = new VLC([
		  '-I', 'dummy',
		  '-V', 'dummy',
		  '--verbose', '1',
		  '--no-video-title-show',
		  '--no-disable-screensaver',
		  '--no-snapshot-preview',
		]);
		
	})
	after(function(){
		vlc.release();
	})
	it('multiple calls to mediaplayer should always return the same object',function(){
		var testSample = vlc.mediaplayer;
		expect(vlc.mediaplayer).to.deep.equal(testSample);
	})
	it('can instanciate media objects',function(){
		var media = vlc.mediaFromFile('fixtures.Animated.gif');
		expect(media.title).to.equal('fixtures.Animated.gif');
	})
})