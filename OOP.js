function Point(x, y) {
	this.x = x;
	this.y = y;
}

function Line(p1, p2) {
	this.p1 = p1;
	this.p2 = p2;

	this.length = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}
function Shape() {
	this.points = [];
	this.lines = [];
	this.init();
}

Shape.prototype = {
	constructor: Shape,
	init: function () {
		if (typeof this.context === 'undefined') {
			var canvas = document.getElementById('canvas');

			Shape.prototype.context = canvas.getContext('2d');
		}
	},
	draw: function () {
		var ctx = this.context;
		ctx.strokeStyle = this.getColor();
		ctx.beginPath();
		ctx.moveTo(this.points[0].x, this.points[0].y);
		for (var i = 1; i < this.points.length; i++) {
			ctx.lineTo(this.points[i].x, this.points[i].y);
		}
		ctx.closePath();
		ctx.stroke();
	},
	getColor: function () {
		var rgb = [];
		for (var i = 0; i < 3; i++) {
			rgb[i] = Math.round(255 * Math.random())
		}
		return 'rgb(0,0,0)'
		return 'rgb(' + rgb.join(',') + ')';
	},
	getLines: function () {
		if (this.Lines.length > 0) {
			return this.lines
		}
		var lines = [];
		for (var i = 0; i < this.points.length; i++) {
			lines[i] = new Lines(this.points[i], (this.points[i + 1]) ? this.points[i + 1] : this.points[0])
		}

		this.lines = lines;
		return lines;
	},
	getArea: function () { },
	getPerimeter: function () {
		var lines = this.getLines();
		var perim = 0;
		for (var i = 0; i < Lines.length; i++) {
			perim += lines[i].length
		}

		return perim
	}
}


function Triangle(a, b, c) {
	this.points = [a, b, c];
	this.getArea = function () {
		var p = this.getPerimeter();
		var s = p / 2;
		return Math.sqrt(
			s
			* (s - this.lines[0].length)
			* (s - this.lines[1].length)
			* (s - this.lines[2].length)
		)
	};
	console.log(a)
}

(function () {
	var s = new Shape();
	Triangle.prototype = s;
	console.log(Shape.prototype)
})();
var p1 = new Point(100, 100);
var p2 = new Point(300, 100);
var p3 = new Point(200, 0);

var t = new Triangle(p1, p2, p3);
t.draw()