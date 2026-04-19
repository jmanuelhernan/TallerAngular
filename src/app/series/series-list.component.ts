import { Component, OnInit } from '@angular/core';
import { Serie } from './serie.model';
import { SeriesService } from './series.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf]
})
export class SeriesListComponent implements OnInit {

  series: Serie[] = [];
  averageSeasons: number = 0;
  selectedSerie: Serie | null = null;

  constructor(private seriesService: SeriesService) {}

  selectSerie(s: Serie): void {
    this.selectedSerie = s;
  }

  ngOnInit(): void {
    this.seriesService.getSeries().subscribe({
      next: (data: Serie[]) => {
        this.series = data;
        const total = data.reduce((sum, s) => sum + Number(s.seasons), 0);
        this.averageSeasons = Math.round(total / data.length);
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
}