﻿////////////////////////////////////////////////////////////////////////////////
// Triangles.Program
var $Triangles_$Program = function() {
};
$Triangles_$Program.$main = function() {
	$(function() {
		new $Triangles_$TriangleGame();
	});
};
////////////////////////////////////////////////////////////////////////////////
// Triangles.TriangleGame
var $Triangles_$TriangleGame = function() {
	this.$myAllTriangles = null;
	this.$myCanvas = null;
	this.$myFirstSelected = null;
	this.$myTriangles = null;
	this.$myCanvas = $Triangles_Utility_CanvasInformation.create$1(document.getElementById('cnvGameBoard'), $Triangles_$TriangleGame.$size.x, $Triangles_$TriangleGame.$size.y);
	this.$myCanvas.context.lineCap = 'round';
	this.$myCanvas.context.lineJoin = 'round';
	this.$myCanvas.canvas.addEventListener('contextmenu', function(evt) {
		evt.preventDefault();
	}, false);
	this.$myCanvas.jCanvas.mousedown(Function.mkdel(this, function(_ae) {
		var pointer = $Triangles_Utility_Help.getCursorPosition(this.$myCanvas.canvas, _ae);
		var selected = null;
		if (pointer.right) {
			var neighbors = [];
			for (var l = 0; l < this.$myAllTriangles.length; l++) {
				this.$myAllTriangles[l].neighbors = false;
				if (this.$myAllTriangles[l].inBounds(pointer.x, pointer.y)) {
					if (!this.$myAllTriangles[l].neighbors) {
						neighbors = this.$myAllTriangles[l].getLikeNeighbors(this.$myTriangles);
					}
				}
			}
			for (var i = 0; i < neighbors.length; i++) {
				neighbors[i].neighbors = true;
			}
		}
		else {
			for (var l1 = 0; l1 < this.$myAllTriangles.length; l1++) {
				this.$myAllTriangles[l1].selected = this.$myAllTriangles[l1].highlightedNeighbors = this.$myAllTriangles[l1].neighbors = false;
				if (this.$myAllTriangles[l1].inBounds(pointer.x, pointer.y)) {
					(selected = this.$myAllTriangles[l1]).selected = true;
				}
			}
			if (ss.isValue(selected)) {
				if (ss.isNullOrUndefined(this.$myFirstSelected) || !this.$myFirstSelected.isNeighbor(selected.x, selected.y)) {
					this.$myFirstSelected = selected;
					selected.highlightNeighbors(this.$myTriangles);
				}
				else {
					var c2 = this.$myFirstSelected.color;
					this.$myFirstSelected.transitionTo(selected.color);
					selected.transitionTo(c2);
					selected.selected = false;
					this.$myFirstSelected = null;
				}
			}
		}
	}));
	this.$myCanvas.jCanvas.mousemove(Function.mkdel(this, function(_ae1) {
		var pointer1 = $Triangles_Utility_Help.getCursorPosition(this.$myCanvas.canvas, _ae1);
		for (var l2 = 0; l2 < this.$myAllTriangles.length; l2++) {
			this.$myAllTriangles[l2].glow = false;
			if (this.$myAllTriangles[l2].inBounds(pointer1.x, pointer1.y)) {
				this.$myAllTriangles[l2].glow = true;
			}
		}
	}));
	this.$init();
	window.setInterval(Function.mkdel(this, this.$drawBoard), 33);
};
$Triangles_$TriangleGame.prototype = {
	$init: function() {
		this.$myAllTriangles = [];
		var boardWidth = 13;
		var boardHeight = 6;
		this.$myTriangles = new Array(boardWidth);
		for (var x = 0; x < boardWidth; x++) {
			this.$myTriangles[x] = new Array(boardHeight);
		}
		for (var y = 0; y < boardHeight; y++) {
			for (var x1 = 0; x1 < boardWidth; x1++) {
				var off = ((y % 2 === 0) ? 1 : 0);
				var off2 = (x1 + off) % 2 === 0;
				var tri = new $Triangles_Triangle(x1, y, off2, $Triangles_Utility_Help.getRandomColor());
				this.$myTriangles[x1][y] = tri;
				this.$myAllTriangles.add(tri);
			}
		}
	},
	$drawBoard: function() {
		this.$myCanvas.context.save();
		this.$myCanvas.context.save();
		this.$myCanvas.context.fillStyle = '#222222';
		this.$myCanvas.context.fillRect(0, 0, $Triangles_$TriangleGame.$size.x, $Triangles_$TriangleGame.$size.y);
		this.$myCanvas.context.restore();
		this.$myCanvas.context.translate($Triangles_$TriangleGame.$offset.x, $Triangles_$TriangleGame.$offset.y);
		var specials = [];
		var specials2 = [];
		var specials3 = [];
		for (var l = 0; l < this.$myAllTriangles.length; l++) {
			if (this.$myAllTriangles[l].selected || this.$myAllTriangles[l].neighbors) {
				specials.add(this.$myAllTriangles[l]);
			}
			else if (this.$myAllTriangles[l].glow) {
				specials3.add(this.$myAllTriangles[l]);
			}
			if (this.$myAllTriangles[l].highlightedNeighbors) {
				specials2.add(this.$myAllTriangles[l]);
			}
			else {
				this.$myAllTriangles[l].draw(this.$myCanvas.context);
			}
		}
		//drawing happens sequentially, and it will draw over our highlight, so we draw those last.
		for (var l1 = 0; l1 < specials2.length; l1++) {
			specials2[l1].draw(this.$myCanvas.context);
		}
		for (var l2 = 0; l2 < specials.length; l2++) {
			specials[l2].draw(this.$myCanvas.context);
		}
		for (var l3 = 0; l3 < specials3.length; l3++) {
			specials3[l3].draw(this.$myCanvas.context);
		}
		this.$myCanvas.context.restore();
	}
};
////////////////////////////////////////////////////////////////////////////////
// Triangles.Triangle
var $Triangles_Triangle = function(_x, _y, upsideDown, _color) {
	this.$spacing = 32;
	this.$transitionToColor = null;
	this.$transitioning = 0;
	this.selected = false;
	this.neighbors = false;
	this.highlightedNeighbors = false;
	this.glow = false;
	this.color = null;
	this.upsideDown = false;
	this.y = 0;
	this.x = 0;
	this.x = _x;
	this.y = _y;
	this.upsideDown = upsideDown;
	this.color = _color;
	this.selected = false;
	this.neighbors = false;
	this.glow = false;
	this.highlightedNeighbors = false;
};
$Triangles_Triangle.prototype = {
	inBounds: function(_x, _y) {
		_x -= $Triangles_$TriangleGame.$offset.x;
		_y -= $Triangles_$TriangleGame.$offset.y;
		if (this.upsideDown) {
			var x = this.x / 2;
			var y = this.y;
			var __x = x * 100 + x * this.$spacing - this.$spacing / 2;
			var __y = y * $Triangles_Triangle.$triangleLength + ss.Int32.div(y * this.$spacing, 2);
			return $Triangles_Utility_Help.isPointInTriangle($Triangles_Utility_Point.$ctor(_x, _y), $Triangles_Utility_Point.$ctor(ss.Int32.trunc(__x), __y), $Triangles_Utility_Point.$ctor(ss.Int32.trunc(__x + 50), __y + $Triangles_Triangle.$triangleLength), $Triangles_Utility_Point.$ctor(ss.Int32.trunc(__x - 50), __y + $Triangles_Triangle.$triangleLength));
		}
		else {
			var x1 = (this.x - 1) / 2;
			var y1 = this.y;
			var __x1 = x1 * 100 + x1 * this.$spacing;
			var __y1 = y1 * $Triangles_Triangle.$triangleLength + ss.Int32.div(y1 * this.$spacing, 2);
			return $Triangles_Utility_Help.isPointInTriangle($Triangles_Utility_Point.$ctor(_x, _y), $Triangles_Utility_Point.$ctor(ss.Int32.trunc(__x1 + 50), __y1 + $Triangles_Triangle.$triangleLength), $Triangles_Utility_Point.$ctor(ss.Int32.trunc(__x1), __y1), $Triangles_Utility_Point.$ctor(ss.Int32.trunc(__x1 + 100), __y1));
		}
	},
	getLikeNeighbors: function(_board) {
		var hitmap = new Array(_board.length);
		for (var x = 0; x < _board.length; x++) {
			hitmap[x] = new Array(_board[x].length);
		}
		return $Triangles_Triangle.startLikeNeighbors(_board, this.x, this.y, this.color, hitmap);
	},
	isNeighbor: function(_x, _y) {
		var neighs;
		neighs = (this.upsideDown ? $Triangles_Triangle.$upsideDownNeighbors : $Triangles_Triangle.$rightSideUpNeighbors);
		for (var i = 0; i < neighs.length; i++) {
			if (this.x + neighs[i].x === _x && this.y + neighs[i].y === _y) {
				return true;
			}
		}
		return false;
	},
	getCurrentColor: function() {
		if (this.$transitioning + 10 >= 100) {
			this.color = this.$transitionToColor;
			this.$transitioning = 0;
		}
		if (this.$transitioning > 0) {
			return $Triangles_Utility_Help.getColor(this.color, this.$transitionToColor, this.$transitioning += 5);
		}
		return this.color;
	},
	highlightNeighbors: function(_board) {
		var neighs;
		if (this.upsideDown) {
			neighs = $Triangles_Triangle.$upsideDownNeighbors;
		}
		else {
			neighs = $Triangles_Triangle.$rightSideUpNeighbors;
		}
		for (var j = 0; j < _board.length; j++) {
			for (var k = 0; k < _board[j].length; k++) {
				_board[j][k].highlightedNeighbors = false;
			}
		}
		for (var i = 0; i < neighs.length; i++) {
			var cX = this.x + neighs[i].x;
			var cY = this.y + neighs[i].y;
			if (cX >= 0 && cX < _board.length && cY >= 0 && cY < _board[0].length) {
				_board[cX][cY].highlightedNeighbors = true;
			}
		}
	},
	transitionTo: function(_toColor) {
		this.$transitionToColor = _toColor;
		this.$transitioning = 1;
	},
	draw: function(_context) {
		_context.save();
		_context.beginPath();
		//worst code
		if (this.neighbors) {
			_context.strokeStyle = '#0C00CC';
		}
		else if (this.selected) {
			_context.strokeStyle = '#FAFAFA';
		}
		else if (this.glow) {
			_context.strokeStyle = 'gold';
		}
		else {
			_context.strokeStyle = 'black';
		}
		if (this.neighbors) {
			_context.lineWidth = 9;
		}
		else if (this.selected) {
			_context.lineWidth = 7;
		}
		else if (this.glow) {
			_context.lineWidth = 5;
		}
		else if (this.highlightedNeighbors) {
			_context.strokeStyle = '#FcFcFc';
			_context.lineWidth = 6;
		}
		else {
			_context.lineWidth = 2;
		}
		_context.fillStyle = this.getCurrentColor();
		if (this.upsideDown) {
			var x = this.x / 2;
			var y = this.y;
			_context.translate(x * 100 + x * this.$spacing - this.$spacing / 2, y * $Triangles_Triangle.$triangleLength + ss.Int32.div(y * this.$spacing, 2));
			if (this.selected) {
				//  ctx.rotate((cur+=3)*Math.PI/180); 
			}
			_context.moveTo(0, 0);
			_context.lineTo(50, 100);
			_context.lineTo(-50, 100);
			_context.lineTo(0, 0);
		}
		else {
			var x1 = (this.x - 1) / 2;
			var y1 = this.y;
			_context.translate(x1 * 100 + x1 * this.$spacing, y1 * $Triangles_Triangle.$triangleLength + ss.Int32.div(y1 * this.$spacing, 2));
			if (this.selected) {
				//  ctx.rotate((cur+=3)*Math.PI/180); 
			}
			_context.moveTo(0, 0);
			_context.lineTo(100, 0);
			_context.lineTo(50, 100);
			_context.lineTo(0, 0);
		}
		_context.fill();
		_context.lineWidth *= 2;
		if (this.glow) {
			_context.lineWidth = 8;
			if (this.$transitioning > 0) {
				_context.strokeStyle = 'white';
			}
			else {
				_context.strokeStyle = 'black';
			}
			_context.stroke();
			_context.lineWidth = 4;
			_context.strokeStyle = 'gold';
			_context.stroke();
		}
		else if (this.selected) {
			_context.stroke();
			_context.lineWidth = 4;
			_context.strokeStyle = 'black';
			_context.stroke();
		}
		else {
			_context.stroke();
		}
		if ((this.neighbors || this.highlightedNeighbors) && !this.glow) {
			_context.lineWidth = 2;
			_context.strokeStyle = '#345782';
			_context.stroke();
		}
		if (this.neighbors) {
			_context.strokeStyle = 'black';
			_context.lineWidth = 9;
			_context.stroke();
			_context.strokeStyle = 'white';
			_context.lineWidth = 4;
			_context.stroke();
		}
		_context.restore();
	}
};
$Triangles_Triangle.startLikeNeighbors = function(_board, _x, _y, _color, _hitMap) {
	//log("x: " + _x + " y: " + _y + "   color: " + _color); 
	var items = [];
	if (_x >= 0 && _x < _board.length && _y >= 0 && _y < _board[0].length) {
		if (_hitMap[_x][_y]) {
			return items;
		}
		_hitMap[_x][_y] = true;
		if (ss.referenceEquals(_board[_x][_y].color, _color)) {
			items.add(_board[_x][_y]);
		}
		else {
			return items;
		}
		if (_board[_x][_y].upsideDown) {
			for (var l = 0; l < $Triangles_Triangle.$upsideDownNeighbors.length; l++) {
				var neighs = $Triangles_Triangle.$upsideDownNeighbors[l];
				items.addRange($Triangles_Triangle.startLikeNeighbors(_board, _x + neighs.x, _y + neighs.y, _color, _hitMap));
			}
		}
		else {
			for (var l1 = 0; l1 < $Triangles_Triangle.$rightSideUpNeighbors.length; l1++) {
				var neighs1 = $Triangles_Triangle.$rightSideUpNeighbors[l1];
				items.addRange($Triangles_Triangle.startLikeNeighbors(_board, _x + neighs1.x, _y + neighs1.y, _color, _hitMap));
			}
		}
	}
	return items;
};
////////////////////////////////////////////////////////////////////////////////
// Triangles.Utility.CanvasInformation
var $Triangles_Utility_CanvasInformation = function(context, domCanvas) {
	this.context = null;
	this.jCanvas = null;
	this.canvas = null;
	this.context = context;
	this.jCanvas = domCanvas;
	this.canvas = domCanvas[0];
};
$Triangles_Utility_CanvasInformation.get_blackPixel = function() {
	if (ss.isNullOrUndefined($Triangles_Utility_CanvasInformation.$blackPixel)) {
		var m = $Triangles_Utility_CanvasInformation.create(0, 0);
		m.context.fillStyle = 'black';
		m.context.fillRect(0, 0, 1, 1);
		$Triangles_Utility_CanvasInformation.$blackPixel = m.canvas;
	}
	return $Triangles_Utility_CanvasInformation.$blackPixel;
};
$Triangles_Utility_CanvasInformation.create = function(w, h) {
	var canvas = document.createElement('canvas');
	return $Triangles_Utility_CanvasInformation.create$1(canvas, w, h);
};
$Triangles_Utility_CanvasInformation.create$1 = function(canvas, w, h) {
	if (w === 0) {
		w = 1;
	}
	if (h === 0) {
		h = 1;
	}
	canvas.width = w;
	canvas.height = h;
	var ctx = canvas.getContext('2d');
	return new $Triangles_Utility_CanvasInformation(ctx, $(canvas));
};
////////////////////////////////////////////////////////////////////////////////
// Triangles.Utility.Extensions
var $Triangles_Utility_Extensions = function() {
};
$Triangles_Utility_Extensions.withData = function(T, T2) {
	return function(item, data) {
		return new (Type.makeGenericType($Triangles_Utility_ExtraData$2, [T, T2]))(item, data);
	};
};
$Triangles_Utility_Extensions.percent$1 = function(num) {
	return num + '%';
};
$Triangles_Utility_Extensions.percent = function(num) {
	return num + '%';
};
////////////////////////////////////////////////////////////////////////////////
// Triangles.Utility.ExtraData
var $Triangles_Utility_ExtraData$2 = function(T, T2) {
	var $type = function(item, data) {
		this.item = T.getDefaultValue();
		this.data = T2.getDefaultValue();
		this.data = data;
		this.item = item;
	};
	$type.op_Implicit = function(d) {
		return d.item;
	};
	$type.op_Implicit$1 = function(d) {
		return d.data;
	};
	Type.registerGenericClassInstance($type, $Triangles_Utility_ExtraData$2, [T, T2], function() {
		return Object;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'Triangles.Utility.ExtraData$2', $Triangles_Utility_ExtraData$2, 2);
////////////////////////////////////////////////////////////////////////////////
// Triangles.Utility.Help
var $Triangles_Utility_Help = function() {
};
$Triangles_Utility_Help.getColor = function(_start, _end, _percent) {
	var hex2Dec = function(_hex) {
		return parseInt(_hex, 16);
	};
	var dec2Hex = function(_dec) {
		return ((_dec < 16) ? '0' : '') + _dec.toString(16);
	};
	_start = _start.substring(1, 7);
	_end = _end.substring(1, 7);
	var r1 = hex2Dec(_start.substring(0, 2));
	var g1 = hex2Dec(_start.substring(2, 4));
	var b1 = hex2Dec(_start.substring(4, 6));
	var r2 = hex2Dec(_end.substring(0, 2));
	var g2 = hex2Dec(_end.substring(2, 4));
	var b2 = hex2Dec(_end.substring(4, 6));
	var pc = _percent / 100;
	var r = ss.Int32.trunc(Math.floor(r1 + pc * (r2 - r1) + 0.5));
	var g = ss.Int32.trunc(Math.floor(g1 + pc * (g2 - g1) + 0.5));
	var b = ss.Int32.trunc(Math.floor(b1 + pc * (b2 - b1) + 0.5));
	return '#' + dec2Hex(r) + dec2Hex(g) + dec2Hex(b);
};
$Triangles_Utility_Help.getCursorPosition = function(element, ev) {
	if (!!(ev.originalEvent && ev.originalEvent.targetTouches && ev.originalEvent.targetTouches.length > 0)) {
		ev = ev.originalEvent.targetTouches[0];
	}
	var offsetX = 0;
	var offsetY = 0;
	if (ss.isValue(element.offsetParent)) {
		do {
			offsetX += element.offsetLeft;
			offsetY += element.offsetTop;
		} while (ss.isValue(element = element.offsetParent));
	}
	if (!!(ss.isValue(ev.pageX) && ss.isValue(ev.pageY))) {
		return $Triangles_Utility_Pointer.$ctor(ev.pageX - offsetX, ev.pageY - offsetY, ss.Nullable.unbox(Type.cast((!!ev.wheelDelta ? (ev.wheelDelta / 40) : (!!ev.detail ? -ev.detail : 0)), ss.Int32)), ev.which === 3);
	}
	return $Triangles_Utility_Pointer.$ctor(ev.clientX - offsetX, ev.clientY - offsetY, ss.Nullable.unbox(Type.cast((!!ev.wheelDelta ? (ev.wheelDelta / 40) : (!!ev.detail ? -ev.detail : 0)), ss.Int32)), ev.which === 3);
};
$Triangles_Utility_Help.getRandomColor = function() {
	return $Triangles_Utility_Help.colors[ss.Int32.trunc(Math.random() * $Triangles_Utility_Help.colors.length)];
};
$Triangles_Utility_Help.isPointInTriangle = function(_s, _a, _b, _c) {
	var asX = _s.x - _a.x;
	var asY = _s.y - _a.y;
	var sAb = (_b.x - _a.x) * asY - (_b.y - _a.y) * asX > 0;
	if ((_c.x - _a.x) * asY - (_c.y - _a.y) * asX > 0 === sAb) {
		return false;
	}
	if ((_c.x - _b.x) * (_s.y - _b.y) - (_c.y - _b.y) * (_s.x - _b.x) > 0 !== sAb) {
		return false;
	}
	return true;
};
$Triangles_Utility_Help.log = function(_cont) {
	var console = $('#txtConsole');
	var text = console.val();
	console.val(text + _cont + '\n');
	console.scrollTop(console[0].scrollHeight - console.height());
};
////////////////////////////////////////////////////////////////////////////////
// Triangles.Utility.Point
var $Triangles_Utility_Point = function() {
};
$Triangles_Utility_Point.$ctor = function(x, y) {
	var $this = {};
	$this.x = 0;
	$this.y = 0;
	$this.x = x;
	$this.y = y;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Triangles.Utility.Pointer
var $Triangles_Utility_Pointer = function() {
};
$Triangles_Utility_Pointer.$ctor = function(x, y, delta, right) {
	var $this = $Triangles_Utility_Point.$ctor(x, y);
	$this.delta = 0;
	$this.right = false;
	$this.delta = delta;
	$this.right = right;
	return $this;
};
Type.registerClass(null, 'Triangles.$Program', $Triangles_$Program, Object);
Type.registerClass(null, 'Triangles.$TriangleGame', $Triangles_$TriangleGame, Object);
Type.registerClass(global, 'Triangles.Triangle', $Triangles_Triangle, Object);
Type.registerClass(global, 'Triangles.Utility.CanvasInformation', $Triangles_Utility_CanvasInformation, Object);
Type.registerClass(global, 'Triangles.Utility.Extensions', $Triangles_Utility_Extensions, Object);
Type.registerClass(global, 'Triangles.Utility.Help', $Triangles_Utility_Help, Object);
Type.registerClass(global, 'Triangles.Utility.Point', $Triangles_Utility_Point, Object);
Type.registerClass(global, 'Triangles.Utility.Pointer', $Triangles_Utility_Pointer);
$Triangles_$TriangleGame.$offset = $Triangles_Utility_Point.$ctor(160, 70);
$Triangles_$TriangleGame.$size = $Triangles_Utility_Point.$ctor(1100, 850);
$Triangles_Triangle.$triangleLength = 100;
$Triangles_Triangle.$upsideDownNeighbors = [$Triangles_Utility_Point.$ctor(-1, 0), $Triangles_Utility_Point.$ctor(1, 0), $Triangles_Utility_Point.$ctor(-2, 0), $Triangles_Utility_Point.$ctor(2, 0), $Triangles_Utility_Point.$ctor(0, -1), $Triangles_Utility_Point.$ctor(-1, -1), $Triangles_Utility_Point.$ctor(1, -1), $Triangles_Utility_Point.$ctor(0, 1), $Triangles_Utility_Point.$ctor(-1, 1), $Triangles_Utility_Point.$ctor(1, 1), $Triangles_Utility_Point.$ctor(-2, 1), $Triangles_Utility_Point.$ctor(2, 1)];
$Triangles_Triangle.$rightSideUpNeighbors = [$Triangles_Utility_Point.$ctor(-1, 0), $Triangles_Utility_Point.$ctor(1, 0), $Triangles_Utility_Point.$ctor(-2, 0), $Triangles_Utility_Point.$ctor(2, 0), $Triangles_Utility_Point.$ctor(0, 1), $Triangles_Utility_Point.$ctor(-1, 1), $Triangles_Utility_Point.$ctor(1, 1), $Triangles_Utility_Point.$ctor(0, -1), $Triangles_Utility_Point.$ctor(-1, -1), $Triangles_Utility_Point.$ctor(1, -1), $Triangles_Utility_Point.$ctor(-2, -1), $Triangles_Utility_Point.$ctor(2, -1)];
$Triangles_Utility_CanvasInformation.$blackPixel = null;
$Triangles_Utility_Help.colors = ['#FF3700', '#7654FF', '#77FFB6', '#DAc42a', '#Ca2dFA'];
$Triangles_$Program.$main();
