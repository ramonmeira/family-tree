function makeFamily(offspring){	
	let son = {
		name: "person",
		sons: {}
	};

	if (offspring>0){
		let sonsNumber = 2;
		for (let i = 0; i < sonsNumber; i++) {
			son.sons[i] = makeFamily(offspring-1);
		}
	}

	return son;
}