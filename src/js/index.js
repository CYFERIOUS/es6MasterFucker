

import App from './modules/app.js';
import Circle from './modules/circle.js';


const app = new App();

const c = new Circle(666);


window.onload = function (){

	c.drawSquare("test");
	c.draw();
	c.move();
	console.log(c.radius);
}



