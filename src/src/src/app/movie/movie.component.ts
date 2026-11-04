import { Component } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import { BioskopModel } from '../models/bioskop.model';
import { BioskopService } from '../services/bioskop.service';
import {AxiosError} from 'axios';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-movies',
  imports: [
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MoviesComponent {
  movies: BioskopModel[] | null = null;
  error: string | null = null;

  constructor(public utils: UtilsService) {
    BioskopService.getMovies()
      .then(res => this.movies = res.data)
      .catch((err: AxiosError) => this.error = `${err.code}: ${err.message}`);
  }

  public formatDate(iso: string) {
    return new Date(iso).toLocaleString('sr-RS');
  }
}
