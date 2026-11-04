import { DetaljiModel } from "../models/detalji.model";

export class DetaljiService {

  static getMovieDetails(): DetaljiModel[] {
    return [
      {  
      id:1,
      director: "Christian Gudegast",
      location:"TC Galerija"
      },
      {
        id:2,
      director: "Michael Morris",
      location:"TC Promenada"
      },
      {  

      id:3,
     
      director: "Brady Corbet",
      location:"TC Promenada"
      }

    ]


  }

  static getMovieById(id: number) {
    return this.getMovieDetails().find(detalji => detalji.id === id);
}



}