import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import {MoviesComponent} from './movie/movie.component';
import { DetailsComponent } from './details/details.component';
import {SearchComponent} from './search/search.component';
import { FilmoviComponent } from './filmovi/filmovi.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { OrderComponent } from './order/order.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'movie', component: MoviesComponent},
    { path: 'details/:movieId/order', component: OrderComponent },
    { path: 'details/:movieId', component: DetailsComponent },
    {path: 'filmovi', component: FilmoviComponent},
    {path: 'user', component: UserComponent},
    {path:'login', component: LoginComponent},
    {path:'search', component: SearchComponent},

    { path: '**', redirectTo: '' }
]
