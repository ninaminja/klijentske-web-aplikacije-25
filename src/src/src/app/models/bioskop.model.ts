export interface BioskopModel{

  movieId : number
  director: {
    directorId: number,
    name: string,
    createdAt : string
  }
  originalTitle : string
  description : string
  shortDescription : string
  runTime : number
  startDate : string
  poster : string
  movieActors : Array<{
    movieActorId: number,
    movieId: number,
    actorId: number,
    actor: {
      actorId: number,
      name: string,
      createdAt: string
    }
  }>
  movieGenres : Array<{
    movieGenreId: number,
    movieId: number,
    genreId: number,
    genre: {
      genreId: number,
      name: string,
      createdAt: string
    }
  }>

}

  