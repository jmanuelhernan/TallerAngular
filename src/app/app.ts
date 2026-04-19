import { Component, signal } from '@angular/core';
import { SeriesListComponent } from "./series/series-list.component";

@Component({
  selector: 'app-root',
  imports: [SeriesListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('taller-angular');
}