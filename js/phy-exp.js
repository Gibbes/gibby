/** Physics Experiment
by Michael Gibbes **/

var canvas = document.getElementById('Physics');

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
	Mouse = Matter.Mouse,
	MouseConstraint = Matter.MouseConstraint;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    canvas: canvas,
    engine: engine,
	options: {
		width: canvas.width,
		height: canvas.height,
		background: "#ff7630",
		wireframes: false
	}
});

var options = {
	render: {
		fillStyle: 'transparent',
		lineWidth: 10
	}
};
// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80, options);
var boxB = Bodies.rectangle(450, 50, 80, 80, options);

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, Bodies.rectangle(300, 300, 80, 80, options)]);

options = { 
	isStatic: true,
	render: {
		fillStyle: 'transparent'
	}
};

    // these static walls will not be rendered in this sprites example, see options
    World.add(engine.world, [
        Bodies.rectangle(canvas.width / 2, 0, canvas.width, 50, options),
        Bodies.rectangle(canvas.width / 2, canvas.height, canvas.width, 50, options),
        Bodies.rectangle(canvas.width, canvas.height / 2, 50, canvas.height, options),
        Bodies.rectangle(0, canvas.height / 2, 50, canvas.height, options)
    ]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
	mouse: mouse,
	constraint: {
		stiffness: 0.2,
		render: {
			visible: false
		}
	}
});
World.add(engine.world, mouseConstraint);
render.mouse = mouse;
