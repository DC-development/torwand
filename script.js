$(document).ready(function() {
    $("#button").on("click", function() {
        bezierMotion1(parseInt($("#direction").val()), parseInt($("#speed").val()), 580, 210, 25);
    });
    canvas = jQuery("#bezier_motion1"); //Doubled no good
});


// Pass in power(distance) , angle and startpoint 
// and return matrix to iterate over in draw loop

curveParams = function(d, v, bx, by) {

    console.log("curve" + d, v)
    

    // Set the base point from canvas width (center)
    base_x = jQuery(canvas).parent().width() / 2;

    // Convert degrees to radiant
    rd = d * (Math.PI / 180);

    x2 = Math.round(bx + Math.cos(rd) * v);
    y2 = Math.round(by - Math.sin(rd) * v);

    // Offset of controlpoints a and b 
    xoffset_a = 10;
    xoffset_b = 20;

    if (d < 90) {
        matrix = {
            p0: { x: bx, y: by }, //Start point (always centered)
            p1: { x: bx + v / 1.5, y: 10 }, //Controlpoint A
            p2: { x: bx + v / 1.5, y: 10 }, //Controlpoint B
            p3: { x: x2, y: y2 } //End of one  Motionsegment
        }
    }
    if (d == 90) {
      console.log("90 degrees");
        matrix = {
            p0: { x: bx, y: by }, //Start point (always centered)
            p1: { x: x2 , y: 10 }, //Controlpoint A
            p2: { x: x2 , y: 10 }, //Controlpoint B
            p3: { x: x2, y: y2 } //End of one  Motionsegment
        }
    }
    if (d > 90) {
        matrix = {
            p0: { x: bx, y: by }, //Start point (always centered)
            p1: { x: bx - v / 1.5, y: y2 - v  }, //Controlpoint A
            p2: { x: bx - v / 1.5, y: y2 - v  }, //Controlpoint B
            p3: { x: x2, y: y2 } //End of one  Motionsegment
        }
    }

    //console.log(matrix);
    console.log(x2, y2);
    return matrix;
}

function bezierMotion1(d, v, bx, by, radius) {

    var breadcrumbs = new Array();
    var crumbRadius = 1;
    var canvas = jQuery("#bezier_motion1");
    var context = canvas.get(0).getContext("2d");
    var parentWidth = jQuery(canvas).parent().width();
    var canvasWidth = context.canvas.width = parentWidth;
    var canvasHeight = context.canvas.height = 288;

    //function Ball(x,y,radius,color,strokeColor,lineWidth) in ball.js
    //var ball_4 = new Ball(0,0,12,'#f16529','#000',7);
    var ball_4 = new Ball();

    var speed;
    var t;
    ball_4.t = 0;
    ball_4.speed = .025;
    ball_4.scaleX = 90;
    ball_4.scaleY = 90;

    console.log(d, v, bx, by)
    var matrix = curveParams(d, v, bx, by);
    //window.cancelAnimationFrame(drawFrame, canvas);

    drawFrame();

    function drawFrame() {
        myLoop = window.requestAnimationFrame(drawFrame, canvas);
        context.clearRect(0, 0, canvasWidth, canvasHeight); // clear canvas

        t = ball_4.t;

        var cx = 3 * (matrix.p1.x - matrix.p0.x);
        var bx = 3 * (matrix.p2.x - matrix.p1.x) - cx;
        var ax = matrix.p3.x - matrix.p0.x - cx - bx;

        var cy = 3 * (matrix.p1.y - matrix.p0.y);
        var by = 3 * (matrix.p2.y - matrix.p1.y) - cy;
        var ay = matrix.p3.y - matrix.p0.y - cy - by;

        var xt = ax * (t * t * t) + bx * (t * t) + cx * t + matrix.p0.x;
        var yt = ay * (t * t * t) + by * (t * t) + cy * t + matrix.p0.y;

        ball_4.t += ball_4.speed;

        // End of a curve animation
        if (ball_4.t > 1) {
            ball_4.t = 1;
            console.log("end");
            window.cancelRequestAnimationFrame(myLoop); // Stopping the loop
            bezierMotion1(d, v, matrix.p3.x, matrix.p3.y, ball_4.radius);// Start it again with new values
        }

        // While Running
        if (ball_4.t < 1) {
            //ball_4.radius -= 0.25;
            console.log("runnin");
        }

        // New Coords for Ball and draw
        ball_4.x = xt;
        ball_4.y = yt;
        ball_4.scaleX = 50;
        ball_4.scaleY = 50;
        ball_4.offsetX = ball_4.scaleX/2;
        ball_4.offsetY = ball_4.scaleY/2;

        // Prototyped new function drawBall - just loading an image
        ball_4.drawBall(context);

       // ball_4.draw(context);
        /**
         * For development only not needed in Game !
         * This section draws all the control points for the curve and the dots (breadcrumbs) visualizing the curve
         */

        //Draw the context point
        context.font = "10px Verdana";
        context.fillStyle = "#f16529";
        context.beginPath();
        context.arc(matrix.p0.x, matrix.p0.y, 8, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
        context.globalCompositeOperation = "source-over";
        context.fillStyle = "#FFFFFF";
        context.fillText("0", matrix.p0.x - 3, matrix.p0.y + 3);

        //Draw the first control point
        context.fillStyle = "#f16529";
        context.beginPath();
        context.arc(matrix.p1.x, matrix.p1.y, 8, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
        context.globalCompositeOperation = "source-over";
        context.fillStyle = "#FFFFFF";
        context.fillText("1", matrix.p1.x - 3, matrix.p1.y + 3);

        //Draw the second controlpoint
        context.fillStyle = "#f16529";
        context.beginPath();
        context.arc(matrix.p2.x, matrix.p2.y, 8, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
        context.globalCompositeOperation = "source-over";
        context.fillStyle = "#FFFFFF";
        context.fillText("2", matrix.p2.x - 3, matrix.p2.y + 3);

        //Draw the end point
        context.fillStyle = "#f16529";
        context.beginPath();
        context.arc(matrix.p3.x, matrix.p3.y, 8, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
        context.globalCompositeOperation = "source-over";
        context.fillStyle = "#FFFFFF";
        context.fillText("3", matrix.p3.x - 3, matrix.p3.y + 3);

        //draw the breadcrumbs
        //add an breadcrumb to the breadcrumbs array
        breadcrumbs.push({
            x: xt,
            y: yt
        });

        //draw the breadcrumbs that show the track of the movement
        context.globalCompositeOperation = "destination-over";
        showBreadcrumbs(breadcrumbs);

    }; //end drawFrame

    function showBreadcrumbs(breadcrumbs) {
        for (var i = 0; i < breadcrumbs.length; i++) {
            // console.log("hu")
            context.beginPath();
            context.arc(breadcrumbs[i].x, breadcrumbs[i].y, crumbRadius, 0, 2 * Math.PI, false);
            context.closePath();
            context.fillStyle = "#999";
            context.fill();
        }
        //console.log("hu");
    } //end showBreadcrumb
} //end bezierMotion1