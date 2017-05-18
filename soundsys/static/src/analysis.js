var sketch2 = function (p) {
	var sound;
	var sound2;
	var sound3;
	var sound4;
	var fft;


	var filter;
	var filter2;
	var filter3;
	var filter4;

	var cnv;

	var mic;
	var micLevel;
	var amplitude;

	mic = new p5.AudioIn();
	mic.start();

	p.preload = function(){
		sound = p.loadSound('static/assets/claro_luna.mp3');
		sound2 = p.loadSound('static/assets/lilium_acapella.mp3');
		sound3 = p.loadSound('static/assets/lilium_acapella.mp3');
		sound4 = p.loadSound('static/assets/lilium_acapella.mp3');
	};

	p.setup = function(){
		cnv = p.createCanvas(400,400);
		cnv.mouseClicked(p.togglePlay);
		fft = new p5.FFT();
		amplitude = new p5.Amplitude();

		sound.amp(0.2);
		sound2.amp(0.2);
		sound3.amp(0.2);
		sound4.amp(0.2);

		filter = new p5.Filter(); // HighPass, BandPass o LowPass
		filter2 = new p5.Filter(); // HighPass, BandPass o LowPass
		filter3 = new p5.Filter(); // HighPass, BandPass o LowPass
		filter4 = new p5.Filter(); // HighPass, BandPass o LowPass


		// disconnect unfiltered noise,
		// and connect to filter
		sound.disconnect();
		sound.connect(filter);

		sound2.disconnect();
		sound2.connect(filter2);

		sound3.disconnect();
		sound3.connect(filter3);

		sound4.disconnect();
		sound4.connect(filter4);

		p.fill(0);

	};

	p.keyTyped = function() {
		console.log("typed")
		if ( p.key != "d" && p.key != "l" ){
			return 0;
		}
		//computes amplitude values along the time domain. The array indices correspond to samples across a brief moment in time. Each value represents amplitude of the waveform at that sample of time.
		var waveform = fft.waveform();

		//computes amplitude values along the frequency domain. The array indices correspond to frequencies (i.e. pitches), from the lowest to the highest that humans can hear. Each value represents amplitude at that slice of the frequency spectrum.
		var spectrum = fft.analyze();
		p.save(cnv,"image.jpg");

		console.log(spectrum);
		var misCabeceras = new Headers({
			'Content-Type': 'application/json',
		});

		var miInit = {
			method: 'POST',
			headers: misCabeceras,
			mode: 'cors',
			body: JSON.stringify(waveform),
			cache: 'default'
		};

		fetch('/wave', miInit);
		return 0;
	};

	p.draw = function(){
		p.background(240);

		var vol = mic.getLevel();
		var level = amplitude.getLevel();

		
		var valfilter = parseInt(document.querySelector('#fpasslow').value);
		filter.setType(document.querySelector("[name=filter1]:checked").value);
		filter.freq(valfilter);

		var valfilter2 = parseInt(document.querySelector('#fpasslow2').value);
		filter2.setType(document.querySelector("[name=filter2]:checked").value);
		filter2.freq(valfilter2);

		var valfilter3 = parseInt(document.querySelector('#fpasslow3').value);
		filter3.setType(document.querySelector("[name=filter3]:checked").value);
		filter3.freq(valfilter3);

		var valfilter4 = parseInt(document.querySelector('#fpasslow4').value);
		filter4.setType(document.querySelector("[name=filter4]:checked").value);
		filter4.freq(valfilter4);

		var spectrum = fft.analyze();
		p.noStroke();
		p.fill(0,255,0); // spectrum is green
		for (var i = 0; i< spectrum.length; i++){
			var x = p.map(i, 0, spectrum.length, 0, p.width);
			var h = -p.height + p.map(spectrum[i], 0, 255, p.height, 0);
			p.rect(x, p.height, p.width / spectrum.length, h );
		}

		var waveform = fft.waveform();
		p.noFill();
		p.beginShape();
		p.stroke(255,0,0); // waveform is red
		p.strokeWeight(1);
		for (var i = 0; i< waveform.length; i++){
			var x = p.map(i, 0, waveform.length, 0, p.width);
			var y = p.map( waveform[i], -1, 1, 0, p.height);
			p.vertex(x,y);
		}
		p.endShape();

		//p.text('click to play/pause', 4, 10);

		p.translate(p.width/2, p.width/2);
		//p.drawGrid();
	};

	// fade sound if mouse is over canvas
	p.togglePlay = function() {
		console.log("toogle play")
		if ( document.querySelector(".sound").checked ) {
			if (sound.isPlaying()) {
				console.log("s loop")
			}else{
				sound.loop();
			}
		} else {
			console.log("s pause")
			sound.pause();
		}

		if ( document.querySelector(".sound2").checked ) {
			if (sound2.isPlaying()) {
				console.log("s2 loop")
			}else{
				sound2.loop();

			}
		} else {
			console.log("s2 pause")
			sound2.pause();
		}

		if ( document.querySelector(".sound3").checked ) {
			if (sound3.isPlaying()) {
				console.log("s2 loop")
			}else{
				sound3.loop();

			}
		} else {
			console.log("s2 pause")
			sound3.pause();
		}

		if ( document.querySelector(".sound4").checked ) {
			if (sound4.isPlaying()) {
				console.log("s2 loop")
			}else{
				sound4.loop();

			}
		} else {
			console.log("s2 pause")
			sound4.pause();
		}
	};

	p.drawGrid = function() {
		p.stroke(200);
		p.fill(120);
		for (var x=-p.width; x < p.width; x+=30) {
			p.line(x, -p.height, x, p.height);
			p.text(x, x+1, 12);
		}
		for (var y=-p.height; y < p.height; y+=30) {
			p.line(-p.width, y, p.width, y);
			p.text(y, 1, y+12);
		}
	};

};

new p5(sketch2,document.querySelector("#grap"));
