import { CanvasController } from "./canvas_controller.ts";
import { Circle, Square, Triangle, Rectangle } from "./shapes.ts";

console.log("App.ts is loaded and running!");

const canvas = document.querySelector('.mainCanvas') as HTMLCanvasElement;
const controller = new CanvasController(canvas);
const buttonCircle = document.querySelector('.buttonCircle');
const buttonSquare = document.querySelector('.buttonSquare');
const buttonTriangle = document.querySelector('.buttonTriangle');
const buttonRectangle = document.querySelector('.buttonRectangle');

let currentShape: 'circle' | 'square' | 'triangle' | 'rectangle' = 'circle';

const shapesIcon = document.getElementById('shapesIcon');
const shapesContainer = document.querySelector('.shapesContainer');

const colorsIcon = document.getElementById('colorsIcon');
const colorsContainer = document.querySelector('.colorsContainer');
const colorOptions = document.querySelectorAll('.colorOption');

const mousePosition = document.querySelector('.mousePosition') as HTMLElement;

let currentColor: string = '#4096ff';

//function that displays the available shape options upon clicking on the shapes icon
shapesIcon?.addEventListener('click', () => {
    shapesContainer?.classList.toggle('active');
    colorsContainer?.classList.remove('active');
});

//function that displays the available color options upon clicking on the colors icon
colorsIcon?.addEventListener('click', () => {
    colorsContainer?.classList.toggle('active');
    shapesContainer?.classList.remove('active');
});

//function that handles the color selected
colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        const selectedColor = option.getAttribute('data-color');
        if(selectedColor) {
            currentColor = selectedColor;

            colorOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');

            console.log(`Selected color: ${currentColor}`);
        }
    })
})

//function that handles the shape
const createShape = (shape: string, x: number, y: number, color: string) => {
    switch(shape) {
        case 'circle': return new Circle(x, y, 30, color);
        case 'square': return new Square(x, y, 50, color);
        case 'triangle': return new Triangle(x, y, 40, color);
        case 'rectangle': return new Rectangle(x, y, 80, 40, color);
        default: return new Circle(x, y, 30, color);
    }
}

//function that draws the shape upon clicking on a spot in the canvas
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const shape = createShape(currentShape, x, y, currentColor);

    controller.addShape(shape);
});

//function that sets the shape to be drawn to circle
buttonCircle?.addEventListener('click', () => {
    currentShape = 'circle';
});

//function that sets the shape to be drawn to square
buttonSquare?.addEventListener('click', () => {
    currentShape = 'square';
});

//function that sets the shape to be drawn to triangle
buttonTriangle?.addEventListener('click', () => {
    currentShape = 'triangle';
});

//function that sets the shape to be drawn to rectangle
buttonRectangle?.addEventListener('click', () => {
    currentShape = 'rectangle';
})

//event listener for the potential change of the mouse's position
canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();

    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);

    if(mousePosition) {
        mousePosition.innerText = `Coordinates: X: ${x}, Y: ${y}`;
    }
});

