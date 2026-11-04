import axios from 'axios';

const client = axios.create({
    baseURL: 'https://movie.pequla.com/api/',
    headers: {
        'Accept': 'application/json',
        'X-Client-Name': 'movie25'
    },
    validateStatus: (status: number)=>{
        return status === 200 // samo ako je 200 vrati response 

    }
})

export class BioskopService {
    static async getMovies(page: number = 0, size: number = 10) {
        return client.request({
            url: '/movie',
            method : 'GET',
            params: {
                'page': page,
                'size': size,
                'sort': 'startDate,asc',
            }
        })
}

    static async getMovieById(movieId: number){
        return client.get(`movie/${movieId}`)

    }
}