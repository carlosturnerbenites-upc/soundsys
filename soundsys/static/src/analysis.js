var sketch2 = function (p) {
	var sound;
	var sound2;
	var fft;
	var filterhp;
	var filterhp2;
	var filterlp;
	var filterlp2;
	var filterbp;
	var filterbp2;
	var cnv;

	var mic;
	var micLevel;
	var amplitude;

	mic = new p5.AudioIn();
	mic.start();

	p.preload = function(){
		sound = p.loadSound('static/assets/claro_luna.mp3');
		sound2 = p.loadSound('static/assets/op_ttg.mp3');

		/*nota_do = p.loadSound('static/assets/do.mp3');
		nota_re = p.loadSound('static/assets/re.mp3');
		nota_mi = p.loadSound('static/assets/mi.mp3');
		nota_fa = p.loadSound('static/assets/fa.mp3');
		nota_sol = p.loadSound('static/assets/sol.mp3');
		nota_la = p.loadSound('static/assets/la.mp3');
		nota_si = p.loadSound('static/assets/si.mp3');
		nota_do = p.loadSound('static/assets/do.mp3');*/
	};

	p.setup = function(){
		cnv = p.createCanvas(400,400);
		cnv.mouseClicked(p.togglePlay);
		fft = new p5.FFT();
		amplitude = new p5.Amplitude();

		sound.amp(0.2);
		sound2.amp(0.2);

		filterlp = new p5.LowPass(); // HighPass, BandPass o LowPass
		filterlp2 = new p5.LowPass(); // HighPass, BandPass o LowPass
		filterhp = new p5.HighPass(); // HighPass, BandPass o LowPass
		filterhp2 = new p5.HighPass(); // HighPass, BandPass o LowPass
		filterbp = new p5.BandPass(); // HighPass, BandPass o LowPass
		filterbp2 = new p5.BandPass(); // HighPass, BandPass o LowPass

		// disconnect unfiltered noise,
		// and connect to filter
		sound.disconnect();
		sound.connect(filterlp,filterhp,filterbp);

		sound2.disconnect();
		sound2.connect(filterlp2,filterhp2,filterbp2);

		p.fill(0);

	};

	p.keyPressed = function() {
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

		var valfpasslow = parseInt(document.querySelector('#fpasslow').value);
		var valfpasshigh = parseInt(document.querySelector('#fpasshigh').value);
		var valfilterbp = parseInt(document.querySelector('#fbandpass').value);
		
		filterhp.res(valfpasshigh);
		filterlp.res(valfpasslow);
		filterbp.res(valfilterbp);

		var valfpasslow2 = parseInt(document.querySelector('#fpasslow2').value);
		var valfpasshigh2 = parseInt(document.querySelector('#fpasshigh2').value);
		var valfilterbp2 = parseInt(document.querySelector('#fbandpass2').value);

		filterhp2.res(valfpasshigh2);
		filterlp2.res(valfpasslow2);
		filterbp2.res(valfilterbp2);

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

		p.text('click to play/pause', 4, 10);

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
