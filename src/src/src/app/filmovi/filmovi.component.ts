import { Component } from '@angular/core';
import { DetaljiModel } from '../models/detalji.model';
import { DetaljiService } from '../services/detalji.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-filmovi',
  imports: [MatTableModule, MatButtonModule, NgIf],
  templateUrl: './filmovi.component.html',
  styleUrl: './filmovi.component.css'
})
export class FilmoviComponent {

    displayedColumns: string[] = ['id', 'title', 'director', 'shortDescription',  'runTime', 'startDate',  'genre', 'actors',  'website', 'status', 'ocena','location'];
    dataSource : DetaljiModel[] = DetaljiService.getMovieDetails();

}
