import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Serie } from './serie.model';
import { SeriesService } from './series.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class SeriesListComponent implements OnInit {

  series: Serie[] = [];
  averageSeasons: number = 0;
  selectedSerie: Serie | null = null;

  constructor(
    private seriesService: SeriesService,
    private cdr: ChangeDetectorRef
  ) {}

  selectSerie(s: Serie): void {
    this.selectedSerie = s;
  }

  ngOnInit(): void {
    this.seriesService.getSeries().subscribe((data: Serie[]) => {
      this.series = data;
      console.log(this.series);
      const total = data.reduce((sum, s) => sum + Number(s.seasons), 0);
      this.averageSeasons = Math.round(total / data.length);
      this.cdr.detectChanges();
    });
  }
}