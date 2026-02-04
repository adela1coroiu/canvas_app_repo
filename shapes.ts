import { Shape } from "./shape.ts";

export class Circle implements Shape {
    constructor(private x: number, private y: number, private radius: number, private color: string) {}

    draw(context: CanvasRenderingContext2D): void {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }
}

export class Square implements Shape {
    constructor(private x: number, private y: number, private size: number, private color: string) {}

    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = this.color;
        context.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size)
    }
}

export class Triangle implements Shape {
    constructor(private x: number, private y: number, private size: number, private color: string) {}

    draw(context: CanvasRenderingContext2D): void {
        context.beginPath();
        context.moveTo(this.x, this.y - this.size/2);
        context.lineTo(this.x + this.size/2, this.y + this.size/2);
        context.lineTo(this.x - this.size/2, this.y + this.size/2);
        context.closePath();
        context.fillStyle = this.color;
        context.fill();
    }
}

export class Rectangle implements Shape {
    constructor(private x: number, private y: number, private width: number, private height: number, private color: string) {}

    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = this.color;
        context.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    }
}