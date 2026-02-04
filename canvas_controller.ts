import { Shape } from "./shape.ts";

export class CanvasController {
    private shapes: Shape[] = [];
    private context: CanvasRenderingContext2D;

    constructor(private canvas: HTMLCanvasElement) {
        this.context = canvas.getContext('2d')!;
    }

    addShape(shape: Shape) {
        this.shapes.push(shape);
        this.render();
        this.updateLegend();
    }

    private render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.shapes.forEach(shape => shape.draw(this.context));
    }

    private updateLegend() {
        const counter = document.querySelector('.shapeCount') as HTMLElement;
        if(counter) {
            counter.innerText = `Shapes: ${this.shapes.length}`;
        }
    }
}