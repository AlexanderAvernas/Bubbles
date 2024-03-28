import { Component, HostListener } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'bouncing-bouble',
  standalone: true,
  templateUrl: './bouncing-bouble.component.html',
  styleUrls: ['./bouncing-bouble.component.css'],
  animations: [
    trigger('circleAnimation', [
      state(
        'normal',
        style({
          transform: 'scale(1)',
        })
      ),
      state(
        'split',
        style({
          transform: 'scale(0.5)',
        })
      ),
      transition('normal <=> split', animate('200ms ease-in-out')),
    ]),
  ],
})
export class BouncingBoubleComponent {
    circles: {
      xPosition: number;
      yPosition: number;
      deltaX: number;
      deltaY: number;
      circleSize: number;
      color: string; // Add color property
    }[] = [];
    colorArray: string[] = ['lightblue', 'lightgreen', 'lightcoral', 'lightyellow']; // Adjusted colors

    constructor() {
      this.generateCircle(); // Generate initial circle
    }

    // Adjust circle position on window resize
    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
      this.circles.forEach((circle) => {
        this.adjustCirclePosition(circle);
      });
    }

    adjustCirclePosition(circle: {
      xPosition: number;
      yPosition: number;
      deltaX: number;
      deltaY: number;
      circleSize: number;
    }) {
      // Adjust x and y positions based on window size and circle size
      circle.xPosition = Math.min(
        circle.xPosition,
        window.innerWidth - circle.circleSize
      );
      circle.yPosition = Math.min(
        circle.yPosition,
        window.innerHeight - circle.circleSize
      );
    }

    generateCircle() {
      const newCircle = {
        xPosition: Math.random() * (window.innerWidth - 50), // Random initial x position
        yPosition: Math.random() * (window.innerHeight - 50), // Random initial y position
        deltaX: Math.random() * 10 - 5, // Random initial x velocity
        deltaY: Math.random() * 10 - 5, // Random initial y velocity
        circleSize: 50, // Initial size of the circle
        color: this.colorArray[Math.floor(Math.random() * this.colorArray.length)] // Random color selection
      };
      this.adjustCirclePosition(newCircle);
      this.circles.push(newCircle);
      this.moveCircle(newCircle);
    }

    moveCircle(circle: {
        xPosition: number;
        yPosition: number;
        deltaX: number;
        deltaY: number;
        circleSize: number;
      }): void {
        setInterval(() => {
          // Check for collision with window edges
          if (
            circle.xPosition + circle.deltaX < 0 ||
            circle.xPosition + circle.deltaX > window.innerWidth - circle.circleSize
          ) {
            circle.deltaX = -circle.deltaX;
          }
          if (
            circle.yPosition + circle.deltaY < 0 ||
            circle.yPosition + circle.deltaY >
              window.innerHeight - circle.circleSize
          ) {
            circle.deltaY = -circle.deltaY;
          }

          // Update circle position
          circle.xPosition += circle.deltaX;
          circle.yPosition += circle.deltaY;

          // Check for collision with other circles
          this.circles.forEach((otherCircle) => {
            if (circle !== otherCircle) {
              const dx = otherCircle.xPosition - circle.xPosition;
              const dy = otherCircle.yPosition - circle.yPosition;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const minDistance =
                circle.circleSize / 2 + otherCircle.circleSize / 2;

              if (distance < minDistance) {
                // Circles collide, calculate forces for bounce effect
                const angle = Math.atan2(dy, dx);
                const targetX = circle.xPosition + Math.cos(angle) * minDistance;
                const targetY = circle.yPosition + Math.sin(angle) * minDistance;
                const overlap = minDistance - distance;

                // Apply forces based on overlap
                const forceX = overlap * Math.cos(angle);
                const forceY = overlap * Math.sin(angle);

                circle.xPosition -= forceX / 2;
                circle.yPosition -= forceY / 2;
                otherCircle.xPosition += forceX / 2;
                otherCircle.yPosition += forceY / 2;
              }
            }
          });
        }, 60); // Adjust speed as needed
      }

    onClick() {
      this.generateCircle(); // Generate new circle on click
    }

    getCircleBackground(circle: { color: string }): string {
      return `radial-gradient(circle, ${circle.color}, transparent)`;
    }

    trackByFn(index: number, circle: any): number {
      return index; // or unique identifier
    }
  }
