import Shape from './shape.js';

const _radius = new WeakMap();

class Circle extends Shape{
	constructor(radius){
		super();
		_radius.set(this,radius);

	}

	get radius(){
		return _radius.get(this);
	}

	set radius(value){
		if(value<=0) throw new Error('invalid radius');
		_radius.set(this,value);
	}

	draw(){
		console.log(`the radius is ${this.radius} okok`);
	}

	drawSquare(id){
		document.getElementById(id).innerHTML = `the radius is ${this.radius} okok`;
	}
}

export default Circle;