import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { BioskopModel } from '../models/bioskop.model';
import { BioskopService } from '../services/bioskop.service';
import {NgForOf, NgIf} from '@angular/common';
import { UtilsService } from '../services/utils.service';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-details',
  imports: [NgIf, NgForOf, RouterLink, MatButton],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  public movie: BioskopModel | null = null;
  public error: string | null = null;

  public constructor(private route: ActivatedRoute, public utils: UtilsService) {
    route.params.subscribe(params => {
      BioskopService.getMovieById(params['movieId'])
        .then(res => {
          this.movie = res.data;
        });
    })
  }
}
