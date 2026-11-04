import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { BioskopModel } from '../models/bioskop.model';
import { NgIf } from '@angular/common';
import { BioskopService } from '../services/bioskop.service';
import { UtilsService } from '../services/utils.service';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';




@Component({
  selector: 'app-search',
  imports: [MatTableModule, NgIf, MatButton,RouterLink, MatInputModule,MatFormFieldModule,MatCardModule, FormsModule, MatSelectModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  displayedColumns: string[] = ['originalTitle', 'director', 'actor.actor.name', 'genre','startDate', 'runTime', 'actions'];
  dataSource : BioskopModel[] | null = null
  allData : BioskopModel[] | null = null
  movieList: string[]=[]
  selectMovies:string | null = null
  genreList: string[]=[]
  selectGenre:string | null = null
  directorList: string[]=[]
  selectDirector:string | null = null
  userInput: string =''
  dateOptions: string[] = []
  selectDate: string | null = null

  public constructor(public utils: UtilsService){
    BioskopService.getMovies().then (rsp=>{
      this.allData = rsp.data.slice(0,15)
      this.dataSource=rsp.data
      this.generateSearchCriteria(rsp.data)
  })
  }

  public generateSearchCriteria(source: BioskopModel[]) {
    this.movieList = source.map(obj => obj.originalTitle)
      .filter((mov: string, i: number, ar: any[]) => ar.indexOf(mov) === i)
      this.genreList = source
      .flatMap(movie => movie.movieGenres.map(g => g.genre.name)) // Izvlači imena žanrova
      .filter((name, index, arr) => arr.indexOf(name) === index); // Uklanja duplikate
    this.dateOptions = source.map(obj => obj.startDate)
      .map((obj: string) => obj.split('T')[0])
      .filter((date: string, i: number, ar: any[]) => ar.indexOf(date) === i)
      this.directorList = source.map(obj => obj.director.name)
      .filter((mov:string, i: number, ar: any[]) => ar.indexOf(mov) === i)
  }

  public doReset(){
    this.userInput=''
    this.selectMovies=null
    this.selectGenre=null
    this.selectDate=null
    this.selectDirector=null
    this.dataSource=this.allData
    this.generateSearchCriteria(this.allData!)
  }

  public formatDate(iso: string) {
    return new Date(iso).toLocaleString('sr-RS');
  }

  public doFilterChain() {
    if (this.allData == null) return

    this.dataSource = this.allData!
      .filter(obj => {
        // Input Field Search
        if (this.userInput == '') return true
        return obj.originalTitle.toLowerCase().includes(this.userInput) ||
          obj.movieId.toString().includes(this.userInput) ||
          obj.movieGenres.some(g => g.genre.name.includes(this.userInput));
      })
      .filter(obj => {
        // Destintination Search
        if (this.selectMovies == null) return true
        return obj.originalTitle === this.selectMovies
      })
      .filter(obj => {
        // Flight Number Search
        if (this.selectGenre == null) return true
        return obj.movieGenres.some(g => g.genre.name === this.selectGenre);
      })
      .filter(obj => {
        // Date Search
        if (this.selectDate == null) return true
        const start = new Date(`${this.selectDate}T00:00:01`)
        const end = new Date(`${this.selectDate}T23:59:59`)
        const scheduled = new Date(obj.startDate)

        return (start <= scheduled) && (scheduled <= end)
      })
      .filter(obj =>{
        if(this.selectDirector == null) return true
        return obj.director.name === this.selectDirector
      })

    this.generateSearchCriteria(this.dataSource)
  }

}
