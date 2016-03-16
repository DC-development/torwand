// JavaScript Document
function Ball (x,y,radius,color,strokeColor,lineWidth) {
	//ball2 = new Ball(2, Math.random() * 0xffffff,20,'#a3caff','#f16529',1);
  if (x === undefined) { x = 0; }
  if (y === undefined) { y = 0; }
  if (radius === undefined) { radius = 20; }
  if (color === undefined) { color = "#f16529"; }
  if (strokeColor === undefined) { strokeColor = "#000"; }
  if (lineWidth === undefined) { lineWidth = "7"; }
  this.radius=radius;
  //this.color = service.parseColor(color);
  this.color = color;
  this.strokeColor=strokeColor;
  this.lineWidth = lineWidth;
  this.x = x;
  this.y = y;
  this.rotation = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  //this.vx = 0;
 // this.vy = 0;
   }
  
Ball.prototype.draw = function (context) {
  context.save();
  context.rotate(this.rotation);
  context.scale(this.scaleX, this.scaleY);
  context.lineWidth = this.lineWidth;
  context.fillStyle = this.color;
  context.beginPath();
  //x, y, radius, start_angle, end_angle, anti-clockwise
  context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true);
  //x, y, radius, start_angle, end_angle, anti-clockwise
  context.closePath();
  context.fill();
  if (this.lineWidth > 0) {
  context.stroke();
  }  
  context.restore();
  };

Ball.prototype.getBounds = function () {
  return {
    x: this.x - this.radius,
    y: this.y - this.radius,
    width: this.radius * 2,
    height: this.radius * 2
  };
};

function Balla (x,y,radius,color,strokeColor,lineWidth) {
	//ball2 = new Ball(2, Math.random() * 0xffffff,20,'#a3caff','#f16529',1);
  if (x === undefined) { x = 0; }
  if (y === undefined) { y = 0; }
  if (radius === undefined) { radius = 20; }
  if (color === undefined) { color = "#f16529"; }
  if (strokeColor === undefined) { strokeColor = "#000"; }
  if (lineWidth === undefined) { lineWidth = "7"; }
  this.radius=radius;
  //this.color = service.parseColor(color);
  this.color = color;
  this.strokeColor=strokeColor;
  this.lineWidth = lineWidth;
  this.x = x;
  this.y = y;
  this.rotation = 0; 
  this.scaleX = 1;
  this.scaleY = 1;
  //this.vx = 0;
 // this.vy = 0;
   }
  
Balla.prototype.draw = function (context) {
  context.save();
  context.rotate(this.rotation);
  context.scale(this.scaleX, this.scaleY);
  context.lineWidth = this.lineWidth;
  context.fillStyle = this.color;
  context.beginPath();
  //x, y, radius, start_angle, end_angle, anti-clockwise
  context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true);
  //x, y, radius, start_angle, end_angle, anti-clockwise
  context.closePath();
  context.fill();
  if (this.lineWidth > 0) {
  context.stroke();
  }  
  context.restore();
  };

Balla.prototype.getBounds = function () {
  return {
    x: this.x - this.radius,
    y: this.y - this.radius,
    width: this.radius * 1,
    height: this.radius * 1
  };
};