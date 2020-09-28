var width = 1020;
var height = 650;

function draw(){
	canvas = SVG().addTo('body').size(width, height).fill('#fef');
	board(canvas);
	let family = makeFamily(5);
	console.log(family);
}

//Draw the backgroud image for the family tree
function board(canvas){
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

