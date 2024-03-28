import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BouncingBoubleComponent } from './bouncing-bouble/bouncing-bouble.component';
import { CommonModule, NgFor } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BouncingBoubleComponent, CommonModule, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bubbles';
}
