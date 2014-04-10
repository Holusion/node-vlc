describe('media tests',function() {
	var vlc,
	media;
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
	})
	after(function(){
		vlc.release();
	})
	it('tracking media info',function(){
		media.track_info.forEach(function (info) {
		  var Info = info;
		  expect(Info).to.equal(info);
		});

	})
})
