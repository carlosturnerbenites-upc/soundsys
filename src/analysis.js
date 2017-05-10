/*var osc;
var playing = false;

function setup() {
	backgroundColor = color(255,0,255);
	textAlign(CENTER);

	osc = new p5.Oscillator();
	osc.setType('sine');
	osc.freq(240);
	osc.amp(0);
	osc.start();
	console.log(osc)
}

function draw() {
	background(backgroundColor)
	text('click to play', width/2, height/2);
}

function mouseClicked() {
	if (mouseX > 0 && mouseX < width && mouseY < height && mouseY > 0) {
		if (!playing) {
			// ramp amplitude to 0.5 over 0.1 seconds
			osc.amp(0.5, 0.05);
			playing = true;
			backgroundColor = color(0,255,255);
		} else {
			// ramp amplitude to 0 over 0.5 seconds
			osc.amp(0, 0.5);
			playing = false;
			backgroundColor = color(255,0,255);
		}
	}
}*/

// CASE 0: no node specified
// Canvas is auto-generated and appended to body.
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