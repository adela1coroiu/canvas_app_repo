import { Shape } from "./shape.ts";

const checkOverlapping = (a: any, b: any) => {
    if(a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top) {
        return true;
    }
    return false;
}

export class Circle implements Shape {
    constructor(public x: number, public y: number, private radius: number, private color: string) {}

    draw(context: CanvasRenderingContext2D): void {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    contains(mouseX: number, mouseY: number): boolean {
        const distance = Math.sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2);
        if(distance > this.radius) {
            return false;
        }
        return true;
    }

    getBounds(): { left: number; right: number; top: number; bottom: number; } {
        return {
            left: this.x - this.radius,
            right: this.x + this.radius,
            top: this.y - this.radius,
            bottom: this.y + this.radius
        }
    }

    intersects(other: Shape): boolean {
        return checkOverlapping(this.getBounds(), other.getBounds());
    }
}

export class Square implements Shape {
    constructor(public x: number, public y: number, private size: number, private color: string) {}

    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = this.color;
        context.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size)
    }

    contains(mouseX: number, mouseY: number): boolean {
        if(mouseX > this.x + this.size/2) return false;
        if(mouseX < this.x - this.size/2) return false;
        const centerY = this.y - this.size/2;
        if(mouseY > this.y + this.size/2) return false;
        if(mouseY < this.y - this.size/2) return false;
        return true;
    }

    getBounds(): { left: number; right: number; top: number; bottom: number; } {
        return {
            left: this.x - this.size/2,
            right: this.x + this.size/2,
            top: this.y - this.size/2,
            bottom: this.y + this.size/2
        }
    }

    intersects(other: Shape): boolean {
        return checkOverlapping(this.getBounds(), other.getBounds());
    }
}

export class Triangle implements Shape {
    constructor(public x: number, public y: number, private size: number, private color: string) {}

    draw(context: CanvasRenderingContext2D): void {
        context.beginPath();
        context.moveTo(this.x, this.y - this.size/2);
        context.lineTo(this.x + this.size/2, this.y + this.size/2);
        context.lineTo(this.x - this.size/2, this.y + this.size/2);
        context.closePath();
        context.fillStyle = this.color;
        context.fill();
    }

    contains(mouseX: number, mouseY: number): boolean {
        const x1 = this.x;
        const y1 = this.y - this.size/2;

        const x2 = this.x + this.size/2;
        const y2 = this.y + this.size/2;

        const x3 = this.x - this.size/2;
        const y3 = this.y + this.size/2;

        const getArea = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) => {
            const line1 = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
            const line2 = Math.sqrt((x2 - x3) ** 2 + (y2 - y3) ** 2);
            const line3 = Math.sqrt((x1 - x3) ** 2 + (y1 - y3) ** 2);
            const semiperimeter = (line1 + line2 + line3)/2;
            const area = Math.sqrt(semiperimeter * (semiperimeter - line1) * (semiperimeter - line2) * (semiperimeter - line3));

            return area;
        }

        //to check if the point is inside the area of the triangle, we must first check if 
        //the sum of each area of the triangles formed between the mouse coords and the other points of the triangle
        //and the area of the main triangle are equal
        if(getArea(x1, y1, x2, y2, x3, y3) === getArea(mouseX, mouseY, x2, y2, x3, y3) + 
            getArea(x1, y1, mouseX, mouseY, x3, y3) + getArea(x1, y1, x2, y2, mouseX, mouseY)) {
            
                return true;
        }
        return false;
    }

    getBounds(): { left: number; right: number; top: number; bottom: number; } {
        return {
            left: this.x - this.size/2,
            right: this.x + this.size/2,
            top: this.y - this.size/2,
            bottom: this.y + this.size/2
        }
    }

    intersects(other: Shape): boolean {
        return checkOverlapping(this.getBounds(), other.getBounds());
    }
}

export class Rectangle implements Shape {
    constructor(public x: number, public y: number, private width: number, private height: number, private color: string) {}

    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = this.color;
        context.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    }

    contains(mouseX: number, mouseY: number): boolean {
        const x1 = this.x - this.width/2;
        const y1 = this.y + this.height/2;
        if(mouseX < x1 || mouseY > y1) return false;

        const x2 = this.x + this.width/2;
        const y2 = this.y + this.height/2;
        if(mouseX > x2 || mouseY > y2) return false;

        const x3 = this.x - this.width/2;
        const y3 = this.y - this.height/2;
        if(mouseX < x3 || mouseY < y3) return false;

        const x4 = this.x + this.width/2;
        const y4 = this.x - this.height/2;
        if(mouseX > x4 || mouseY < y4) return false;

        return true;
    }

    getBounds(): { left: number; right: number; top: number; bottom: number; } {
        return {
            left: this.x - this.width/2,
            right: this.x + this.width/2,
            top: this.y - this.height/2,
            bottom: this.y + this.height/2
        }
    }

    intersects(other: Shape): boolean {
        return checkOverlapping(this.getBounds(), other.getBounds());
    }
}