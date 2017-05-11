
var sketch3 = function (p) {
	var mic;
	var micLevel;
	var fft3;
	p.setup = function(){
		var cnv = p.createCanvas(400,400);

		mic = new p5.AudioIn();
		mic.start();
		fft3 = new p5.FFT();
		p.fill(0);

	};
	p.draw = function(){
		p.background(0);
		micLevel = mic.getLevel();
		p.ellipse(p.width/2, p.constrain(p.height-micLevel*p.height*5, 0, p.height), 10, 10);


		var waveform = fft3.waveform();
		//console.log(waveform)
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

	};
};
new p5(sketch3);


var sketch = function (p) {
	console.log(p);
	var osc;
	var backgroundColor;
	var playing = false;

	p.setup = function() {
		backgroundColor = p.color(255,0,255);
		p.textAlign(p.CENTER);

		osc = new p5.Oscillator();
		osc.setType('sine');
		osc.freq(240);
		osc.amp(0);
		osc.start();
		console.log(osc);
	};

	p.draw = function() {
		p.background(backgroundColor);
		p.text('click to play', p.width/2, p.height/2);
	};

	p.mouseClicked = function() {
		if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY < p.height && p.mouseY > 0) {
			if (!playing) {
				// ramp amplitude to 0.5 over 0.1 seconds
				osc.amp(0.5, 0.05);
				playing = true;
				backgroundColor = p.color(0,255,255);
			} else {
				// ramp amplitude to 0 over 0.5 seconds
				osc.amp(0, 0.5);
				playing = false;
				backgroundColor = p.color(255,0,255);
			}
		}
	};
};

new p5(sketch);

var sketch2 = function (p) {
	var sound;
	var fft;

	p.preload = function(){
		sound = p.loadSound('assets/jeans-love-theme-mp3-29250.mp3');
	};

	p.setup = function(){
		var cnv = p.createCanvas(400,400);
		cnv.mouseClicked(p.togglePlay);
		fft = new p5.FFT();
		sound.amp(0.2);
		p.fill(0);

	};

	p.draw = function(){
		p.background(240);

		var spectrum = fft.analyze();
		p.noStroke();
		p.fill(0,255,0); // spectrum is green
		for (var i = 0; i< spectrum.length; i++){
			var x = p.map(i, 0, spectrum.length, 0, p.width);
			var h = -p.height + p.map(spectrum[i], 0, 255, p.height, 0);
			p.rect(x, p.height, p.width / spectrum.length, h );
		}

		var waveform = fft.waveform();
		//console.log(__p__)
		if ( __p__ ) {
			console.log(JSON.stringify(waveform))
		}
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
		p.drawGrid();
	};

	// fade sound if mouse is over canvas
	p.togglePlay = function() {
		if (sound.isPlaying()) {
			sound.pause();
		} else {
			sound.loop();
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

new p5(sketch2);
