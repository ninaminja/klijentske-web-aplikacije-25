import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BioskopService } from '../services/bioskop.service';
import { UtilsService } from '../services/utils.service';
import { BioskopModel } from '../models/bioskop.model';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule } from '@angular/material/select';
import { DetaljiModel } from '../models/detalji.model';
import { DetaljiService } from '../services/detalji.service';
import { UserService } from '../services/user.service';
import { FormArray, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  imports: [MatCardModule,  NgIf,MatInputModule, MatButtonModule, MatSelectModule, NgIf, NgFor, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  public movie: BioskopModel | null = null

  public detalji: DetaljiModel[ ] = DetaljiService.getMovieDetails()

  public selectedLocation: number = this.detalji[0].id

  public selectedTicketCount : number = 1

  public selectedPrice : number = 8

  public constructor(private route: ActivatedRoute, public utils: UtilsService, private router : Router) {
    route.params.subscribe(params => {
      BioskopService.getMovieById(params['movieId'])
        .then(res => {
          this.movie = res.data;
        });
    })
  }

  public updateCount (event : any){
    this.selectedLocation = event.target.value
  }

  public updateDetalji(event : any){
    this.selectedLocation = event.target.value
  }


  public doOrder(){

    const result = UserService.createOrder({
      movieId: this.movie!.movieId,
      originalTitle:this.movie!.originalTitle,
      director: this.movie!.director.name,
      location: DetaljiService.getMovieById(this.selectedLocation)!,
      count: this.selectedTicketCount,
      pricePerItem: this.selectedPrice,
      status: 'ordered',
      rating:null 
    })

    result ? this.router.navigate(['/user']) : alert ('An error occured while ordering')

  }

}
