//The tree structure have two parts: (1) The list of parents and children, and (2) the structure of branches based in birth hierarch
function makeFamily(offspring, canvas){	
	console.log(makeTreePosition(familyList(offspring), 0 ,0 , [[0, 0]], canvas));
}

//Paert One - List of parents and children
function familyList(offspring){	
	let son = {
		name: "person",
		surname:"",
		sex:"",
		sons: {}
	};

	if (offspring>0){
		let sonsNumber = 2;
		for (let i = 0; i < sonsNumber; i++) {
			son.sons[i] = familyList(offspring-1);
		}
	}

	return son;
}

//Part two - Branches 
function makeTree(dad,x,y, canvas){
	let treeDimension = {min:x,max:x};
	let heir = getHeir(dad);
	let ajuste = 0;

	dad.bloco = drawBox({x:x,y:y,name:dad.name,surname:dad.surname,code:dad.sex}, canvas);
	dad.x = x;
	dad.y = y;
	dad.branch = {};
	
	if(heir > -1){			
		//Gera filho no meio
		treeDimension = makeSon(dad, treeDimension,x,y,x,(y-1),heir, canvas);
		
		//Gera sons a Right
		for (let i = heir-1; i >= 0; i--) {
			let ajuste = 0;
			if (!isEmptyObject(dad.sons[i].sons[0])) {
				ajuste = getHeirsLeft(dad.sons[i]);
			}
			treeDimension = makeSon(dad, treeDimension, x, y, treeDimension.max+1+ajuste,(y-1), i, canvas);
		}

		//Gera sons a Left
		for (let i = heir+1; i < Object.keys(dad.sons).length; i++) {
			let ajuste = 0;
			if (!isEmptyObject(dad.sons[i].sons[0])) {
				ajuste = getHeirsRight(dad.sons[i]);
			}
			treeDimension = makeSon(dad, treeDimension, x, y,treeDimension.min-1-ajuste,(y-1), i, heir-i, canvas);
		}

	}
	
	return treeDimension;
}

function makeBoxesAndBranches(no, canvas) {
	no.bloco = drawBox({x:no.x,y:no.y,name:no.name,surname:no.surname,code:no.sex}, canvas);
	no.branch = {};
	for (let i = 0; i < Object.keys(no.sons).length; i++) {
		makeBoxesAndBranches(no.sons[i], canvas);
		no.branch[i] = drawBranch(no.x,no.y,no.sons[i].x,no.sons[i].y);
	}
}

const MIN = 0;
const MAX = 1;

function makeTreePosition(no, x, y, treeDimension, canvas){
	let heir = getHeir(no);
	no.x = x;
	no.y = y;		
	no.bloco = drawBox({x:no.x,y:no.y,name:no.name,surname:no.surname,code:no.sex}, canvas);
	no.branch = {};

	if(treeDimension.length < 1-y){
		treeDimension.push([0,0]);
	}
	
	if(heir > -1){			
		//Gera filho no meio
		treeDimension = makeTreePosition(no.sons[heir],x,y-1,treeDimension, canvas);		
		makeBoxesAndBranches(no.sons[heir], canvas);
		no.branch[heir] = drawBranch(no.x,no.y,no.sons[heir].x,no.sons[heir].y);
		
		//Gera sons a Right
		for (let i = heir-1; i >= 0; i--) {
			treeDimension = makeTreePositionRight(no.sons[i],++treeDimension[1-y][MAX],y-1,treeDimension, canvas);

			makeBoxesAndBranches(no.sons[i], canvas);
			no.branch[i] = drawBranch(no.x,no.y,no.sons[i].x,no.sons[i].y);
		}

		//Gera sons a Left
		for (let i = heir+1; i < Object.keys(no.sons).length; i++) {
			treeDimension = makeTreePositionLeft(no.sons[i],--treeDimension[1-y][MIN],y-1,treeDimension, canvas);
			
			makeBoxesAndBranches(no.sons[i], canvas);
			no.branch[i] = drawBranch(no.x,no.y,no.sons[i].x,no.sons[i].y);
		}
	}
	
	return treeDimension;
}

function makeTreePositionRight(no,x,y,treeDimension, canvas) {
	no.x = x;
	no.y = y;	

	if(treeDimension.length <= 1-y){
		treeDimension.push([x,x]);
		console.log(treeDimension);
	}
	
	//Gera sons a Right
	for (let i = Object.keys(no.sons).length-1; i >= 0; i--) {
		treeDimension[1-y][MAX] = Math.max(++treeDimension[1-y][MAX],x-2);
		treeDimension = makeTreePositionRight(no.sons[i],treeDimension[1-y][MAX],y-1,treeDimension, canvas);
	}
	return treeDimension;
}

function makeTreePositionLeft(no,x,y,treeDimension, canvas) {
	no.x = x;
	no.y = y;	

	if(treeDimension.length <= 1-y){
		treeDimension.push([x,x]);
		console.log(treeDimension);
	}
	
	//Gera sons a Left
	for (let i = 0; i < Object.keys(no.sons).length; i++) {
		treeDimension[1-y][MIN] = Math.min(--treeDimension[1-y][MIN],x+2);
		treeDimension = makeTreePositionLeft(no.sons[i],treeDimension[1-y][MIN],y-1,treeDimension, canvas);
	}
	return treeDimension;
}
	
function getHeir(dad) {
	let heir = -1;

	for (let i = 0; i < Object.keys(dad.sons).length; i++) {
		if (dad.sons[i].sex==11) {
			heir = i;
			break;
		}
		else{
			heir = 0;
		}

	}
	return heir;
}

function getHeirsLeft(dad){
	let heir = getHeir(dad);
	let total = Object.keys(dad.sons).length - heir - 1;
	for(let i = 0; i < Object.keys(dad.sons).length; i++){
		total+=getHeirsLeft(dad.sons[i]);
	}
	return total;
}

function getHeirsRight(dad){
	let heir = getHeir(dad);
	let total = heir;
	for(let i = 0; i < Object.keys(dad.sons).length; i++){
		total+=getHeirsRight(dad.sons[i])+1;
	}
	return total;
}

function makeSon(dad, treeDimension, x1, y1, x2, y2, filho, canvas){
	let subtreeDimension = {min:x1,max:x1};

	dad.branch[filho] = drawBranch(x1,y1,x2,y2)
	.back().forward();

	subtreeDimension = makeTree(dad.sons[filho],x2,y2, canvas);
	console.log(treeDimension,subtreeDimension);
	treeDimension.min = Math.min(treeDimension.min,subtreeDimension.min);
	treeDimension.max = Math.max(treeDimension.max,subtreeDimension.max);
	return treeDimension;
}