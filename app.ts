import { CanvasController } from "./canvas_controller.ts";
import { Shape } from "./shape.ts";
import { Circle, Square, Triangle, Rectangle } from "./shapes.ts";

console.log("App.ts is loaded and running!");

const canvas = document.querySelector('.mainCanvas') as HTMLCanvasElement;
const controller = new CanvasController(canvas);
const mousePosition = document.querySelector('.mousePosition') as HTMLElement;

let currentShape: string = 'circle';
let currentColor: string = '#4096ff';

let selectedShape: Shape | null = null;
let isDragging: boolean = false;

const menus = {
    shapes: document.querySelector('.shapesContainer'),
    colors: document.querySelector('.colorsContainer')
}

//function for handling which icon (shapes/colors) has been clicked and bringing forward the corresponding modal
document.querySelectorAll('.icon').forEach(icon => {
    icon.addEventListener('click', () => {
        const target = icon.id === 'shapesIcon' ? menus.shapes : icon.id === 'colorsIcon' ? menus.colors : null;

        Object.values(menus).forEach(menu => {
            if(menu === target) {
                menu?.classList.toggle('active');
            }
            else {
                menu?.classList.remove('active');
            }
        })
    })
});

//function for handling the click on a shape and updating the currentShape to be rendered on the canvas
document.querySelectorAll('.shapesContainer button').forEach(button => {
    button.addEventListener('click', () => {
        currentShape = button.className.replace('button', '').toLowerCase();
        console.log(`Switched to ${currentShape}`);
    })
});

//generic function for mouse events
const getRelativeCoordinates = (event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    return {
        x: Math.round(event.clientX - rect.left),
        y: Math.round(event.clientY - rect.top)
    }
};

//function to detect if we clicked a shape and tried to drag it
canvas.addEventListener('mousedown', (event) => {
    const {x, y} = getRelativeCoordinates(event);
    const clickedShape = controller.getShapeAt(x, y);

    if(clickedShape) {
        selectedShape = clickedShape;
        isDragging = true;
        canvas.style.cursor = 'grabbing';
    }
});

//function to update the location of the shape we just dragged
canvas.addEventListener('mousemove', (event) => {
    const {x, y} = getRelativeCoordinates(event);

    if(mousePosition) {
        mousePosition.innerText = `Coordinates: X: ${x}, Y: ${y}`;
    }

    if(isDragging && selectedShape) {
        const previousX = selectedShape.x;
        const previousY = selectedShape.y;

        selectedShape.x = x;
        selectedShape.y = y;

        if(controller.checkCollision(selectedShape)) {
            selectedShape.x = previousX;
            selectedShape.y = previousY;
        }
        else {
            controller.render();
        }
    }
});

//function to stop dragging the shape
canvas.addEventListener('mouseup', (event) => {
    isDragging = false;
    selectedShape = null;
    canvas.style.cursor = 'crosshair';
});

//function to check if the spot we want to drag the shape it is free
canvas.addEventListener('click', (event) => {
    const {x, y} = getRelativeCoordinates(event);

    const existingShape = controller.getShapeAt(x, y);

    if(!existingShape) {
        const shape = createShape(currentShape, x, y, currentColor);

        if(!controller.checkCollision(shape)) {
            controller.addShape(shape);
        }
        else {
            alert("Cannot place shape here!");
        }
    }
})

//function to track mouse movement (for legend)
canvas.addEventListener('mousemove', (event) => {
    const {x, y} = getRelativeCoordinates(event);
    if(mousePosition) {
        mousePosition.innerText = `Coordinates: X: ${x}, Y: ${y}`;
    }
});

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

//function for picking a certain color for our shape 
menus.colors?.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const selectedColor = target.getAttribute('data-color');

    if(selectedColor) {
        currentColor = selectedColor;

        menus.colors?.querySelectorAll('.colorOption').forEach(opt => {
            opt.classList.remove('selected');
        });

        target.classList.add('selected');
    }
})


