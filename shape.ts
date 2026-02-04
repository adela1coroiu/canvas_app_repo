export interface Shape {
    x: number;
    y: number;
    draw(context: CanvasRenderingContext2D): void;
    contains(mouseX: number, mouseY: number): boolean;
}