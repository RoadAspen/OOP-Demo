/*
 * @Author: RoadAspen 
 * @Date: 2018-11-13 11:37:06 
 * @Last Modified by: RoadAspen
 * @Last Modified time: 2018-11-13 12:50:04
 */
function Point(x, y) { //创建 点 对象
	this.x = x;
	this.y = y;
}

function Line(p1, p2) { //创建 线对象 ，基于点对象创建两点一线。
	this.p1 = p1;
	this.p2 = p2;

	this.length = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)); //每条线对象的长度，自带属性
}
function Shape() {  // 创建基本数据，构造函数
	this.points = []; //组成基点
	this.lines = []; //组成基线
	this.init();  //初始化DOM
}

Shape.prototype = { // 原型属性
	constructor: Shape,  //将 原型的构造函数 绑定到自身，否则的话就是指向 Object
	init: function () {  // 创建时直接执行，将对象与实际 DOM元素绑定
		if (typeof this.context === 'undefined') {
			var canvas = document.getElementById('canvas');

			Shape.prototype.context = canvas.getContext('2d');
		}
	},
	draw: function () {  //绘画 操作 ，基于传入的点划线
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
	getColor: function () { //随机创建 绘制颜色
		var rgb = [];
		for (var i = 0; i < 3; i++) {
			rgb[i] = Math.round(255 * Math.random())
		}
		return 'rgb(' + rgb.join(',') + ')';
	},
	getLines: function () { //获取 线对象的集合
		if (this.lines.length > 0) {
			return this.lines
		}
		var lines = [];
		for (var i = 0; i < this.points.length; i++) {
			lines[i] = new Line(this.points[i], (this.points[i + 1]) ? this.points[i + 1] : this.points[0])
		}

		this.lines = lines;
		return lines;
	},
	getArea: function () { },
	getPerimeter: function () {  //获取周长
		var lines = this.getLines();
		var perim = 0;
		for (var i = 0; i < lines.length; i++) {
			perim += lines[i].length
		}

		return perim
	}
}


function Triangle(a, b, c) {  //三角形
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

(function () {  //继承 
	var s = new Shape();
	Triangle.prototype = s;
	console.log(Shape.prototype)
})();
var p1 = new Point(100, 100);
var p2 = new Point(300, 100);
var p3 = new Point(200, 0);

var t = new Triangle(p1, p2, p3);
t.draw()