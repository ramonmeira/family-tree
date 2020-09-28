var width = 1020;
var height = 650;
var origen = {x: ((width-50)/2), y:(height-25-2)-35};
var boxDimension = {x: 60, y:60};

function draw(){
	canvas = SVG().addTo('body').size(width, height).fill('#fef');
	drawBoard(canvas);
	let family = makeFamily(5, canvas);
	console.log(family);
}

//Draw the backgroud image for the family tree
function drawBoard(canvas){
	let margem = 25;

	let back = canvas.rect(width, height).fill('#def262');
		
	let lineUp = canvas.line(
		2*margem, 
		margem, 
		width-2*margem, 
		margem).stroke({width:2,color:'black'});

	let lineBottom = canvas.line(
		2*margem, 
		height-margem, 
		width-2*margem, 
		height-margem).stroke({width:2,color:'black'});

	let lineRight = canvas.line(
		margem, 
		margem*2, 
		margem, 
		height-margem*2).stroke({width:2,color:'black'});

	let lineLeft = canvas.line(
		width-margem, 
		margem*2, 
		width-margem, 
		height-margem*2).stroke({width:2,color:'black'});

	let lineUpLeft1 = canvas.line(
		margem, 
		margem*3, 
		margem*3.5, 
		margem/2).stroke({width:2,color:'black'});

	let lineUpLeft2 = canvas.line(
		margem/2, 
		margem*4.5, 
		margem*4, 
		margem).stroke({width:2,color:'black'});

	let lineUpRight1 = canvas.line(
		width-margem, 
		margem*3, 
		width-margem*3.5, 
		margem/2).stroke({width:2,color:'black'});

	let lineUpRight2 = canvas.line(
		width-margem/2, 
		margem*4.5, 
		width-margem*4, 
		margem).stroke({width:2,color:'black'});


	let lineDownLeft1 = canvas.line(
		margem, 
		height-margem*3, 
		margem*3.5, 
		height-margem/2).stroke({width:2,color:'black'});

	let lineDownLeft2 = canvas.line(
		margem/2, 
		height-margem*4.5, 
		margem*4, 
		height-margem).stroke({width:2,color:'black'});

	let lineDownRight1 = canvas.line(
		width-margem, 
		height-margem*3, 
		width-margem*3.5, 
		height-margem/2).stroke({width:2,color:'black'});

	let lineDownRight2 = canvas.line(
		width-margem/2, 
		height-margem*4.5, 
		width-margem*4, 
		height-margem).stroke({width:2,color:'black'});
}

function drawBox(data, canvas){
	let x = origen.x+data.x*boxDimension.x
	let y = origen.y+data.y*boxDimension.y
	var group = canvas.group();
	let rect = canvas.rect(50, 25).radius(10)
		.fill('#00ff00').stroke({width: 2, color:'#008000'})
		.move(x,y);
	let name = canvas.text(data.name)
	.fill('black')
	.css('font-size','0.5em')
	.center( x+50/2 , y+25*0.7);

	let surname = canvas.text(data.surname)
	.fill('black')
	.css('font-size','0.5em')
	.center( x+50/2 , y+25*1.15);

	group.add(rect);
	group.add(name);
	group.add(surname);
	return group;
}

function positionBox(group,difference) {
	group.transform({
		translateX: difference*boxDimension.x
	})
}

function drawBranch(x1,y1,x2,y2){
	let line = canvas.path(
		'M'+(origen.x+x1*boxDimension.x+25)+','+(origen.y+y1*boxDimension.y) +
		' C'+(origen.x+x1*boxDimension.x+25)+','+(origen.y+y1*boxDimension.y-25) +
		' '+(origen.x+x2*boxDimension.x+25)+','+(origen.y+y2*boxDimension.y +boxDimension.y*0.7) +
		' '+(origen.x+x2*boxDimension.x+25)+','+(origen.y+y2*boxDimension.y+12.5)
	)
	.fill('none')
	.stroke({ width: 24+y1*3, color:'#803300', linecap: 'round', linejoin: 'round' })
	.back().forward();
	return line;
}