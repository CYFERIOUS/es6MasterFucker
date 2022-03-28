//import LogAr from './logArithmetic.js';
//extends LogAr
const _number = new WeakMap();

class Arithmetics {
	constructor(number){
		//super();
		_number.set(this,number);

	}

	get number(){
		return _number.get(this);
	}

	set number(value){
		if(value<=0) throw new Error('invalid number');
		_number.set(this,value);
	}

	adittion(value1, value2){
		return value1+value2;
	}

	subtraction(value1,value2){
		return value1-value2;
	}

	multiplication(value1, value2){
		return value1 * value2;
	}
	division(value1, value2){
		return value1 / value2;
	}
}

export default Arithmetics;