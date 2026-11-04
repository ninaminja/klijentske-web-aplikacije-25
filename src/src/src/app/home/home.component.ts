import { Component } from '@angular/core';
import { BioskopService } from '../services/bioskop.service';
import { NgFor, NgIf} from '@angular/common';
import { AxiosError} from 'axios';
//import { JsonPipe } from '@angular/common';
import { BioskopModel } from '../models/bioskop.model';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public movies: BioskopModel[] | null=null
  public error: string | null=null

  constructor(){
    BioskopService.getMovies()
    .then(rsp => this.movies = rsp.data.slice(0,10))
    .catch( (e: AxiosError)=> this.error = `${e.code}: ${e.message}`)


}
}