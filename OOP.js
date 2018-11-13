// 一个图形，用面向对象思维编写，利用 类的  抽象、继承、多态、聚合、封装的特性。
//绘制多边形，首先需要利用类的聚合，用多个对象聚合成一个对象。

// 基础对象 有 点对象 ，线 对象 

// 点对象 有 x，y 两个属性。

// 线对象 则是 基于 两个点进行划线，所以需要将两个点对象传入，利用两个点的x,y属性，并且 线对象具有
//长度属性，基于俩个点的x，y 的值进行计算。

// 多边形 对象 Shape是一个 基于 多边形共同属性的抽象，他具有所有多边形共有的属性，包括但不限于 
// 周长、面积、绘制图形的颜色、获取一个多边形的 点、线 的集合的方法、一个执行绘制的方法、一个用来与实际DOM 
//绑定的方法。


//点 构造函数

function Point(x, y) {
	this.x = x;
	this.y = y;
}

// 线 构造函数  两点一线

function Line(p1, p2) {
	this.p1 = p1;
	this.p2 = p2;
	this.length = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
}

// 多边形的构造函数  抽象类
// 多边形 有 点的集合，线的集合 ，将多边形绑定到 DOM
function Polygon() {
	this.init();
}

Polygon.prototype = {
	constructor: Polygon,   //显式的将 构造函数绑定到自身，否则指向 Object。

	init: function () {  // 初始化，将对象绑定到 DOM,判断一个值是否存在时，用typeof 的返回值。
		if (typeof this.context === 'undefined') {
			var canvas = document.getElementById('canvas');
			Polygon.prototype.context = canvas.getContext('2d');
		}
	},
	draw: function () {// 多边形的绘制。
		var ctx = this.context;
		ctx.beginPath();
		ctx.strokeStyle = this.getColors();
		ctx.moveTo(this.points[0].x, this.points[0].y);
		for (var i = 1; i < this.points.length; i++) {
			ctx.lineTo(this.points[i].x, this.points[i].y)
		}
		ctx.closePath();
		ctx.stroke();
	},
	getColors: function () {  //获取 绘制颜色，这里采用rgb颜色，随机颜色
		if (typeof this.color !== 'undefined') {
			return this.color
		}
		this.color = [];
		for (var i = 0; i < 3; i++) {
			this.color[i] = Math.round(255 * Math.random());
		}

		return 'rgb(' + this.color.join(',') + ')'
	},
	getPoints: function () {//获取 点的集合
		return this.points
	},
	getLines: function () {  // 获取多边形的边
		if(typeof this.lines !== 'undefined'){
			return this.lines
		}
		var lines = [];
		for (var i = 0; i < this.points.length; i++) {
			lines[i] = new Line(this.points[i], (this.points[i + 1]) ? this.points[i + 1] : this.points[0])
		}
		console.log(1)

		this.lines = lines;
		return this.lines
	},
	getPerimeter: function () {	// 获取周长
		var prem = 0;
		var lines = this.getLines();  // 调用 自身的getLines 方法
		for (var i = 0; i < lines.length; i++) {
			prem += lines[i].length
		}
		return prem
	},
	getArea: function () {
		//因为各种多边形的 面积公式不同，所以这里不做操作
	}
}

var s = new Polygon();

function Triangle(a, b, c) { // 三角形 的 构造函数 , 需要三个点来绘制三角形
	this.points = [a, b, c]; //点的集合，所有绘制基于 点的集合完成
	this.getArea = function () { //三角形的面积公式，可以根据海伦公式求得。

	}
};

Triangle.prototype = s; //继承了 多边形的所有属性与方法。 这里用的是 指引赋值，即 s 的后续变化依然可以影响到 子元素的继承。  如果使用深拷贝，则可以避免。
Triangle.prototype.constructor = Triangle; //绑定 constructor 到自身

var p1 = new Point(100, 100);
var p2 = new Point(200, 100);
var p3 = new Point(300, 300);

var t = new Triangle(p1, p2, p3);

t.draw();
console.log(t)
console.log(t.getLines())
console.log(t.getLines())
console.log(t)
Polygon.prototype.id = '123';  //在这里给 Polygon 添加属性，还可以传递到已经定义的子元素。
var p4 = new Point(0, 0);
var p5 = new Point(460, 120);
var p6 = new Point(320, 100);
var s = new Triangle(p4,p5,p6);
s.draw();
console.log(s)
console.log(s.getLines())
console.log(s.id)
console.log(t.id)