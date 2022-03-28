class Geometrics{

	constructor(){
		console.log("im shape");
	}

	move(){
		console.log("move");
	}

	draw(){
		console.log(`the radius is ${this.radius} okok`);
	}

	drawFigure(id){
		document.getElementById(id).innerHTML = `the radius is ${this.radius} okok`;
	}

}

export default Shape;