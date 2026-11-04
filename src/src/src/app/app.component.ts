import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { UserService } from './services/user.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public service = UserService

  public constructor(private router: Router){}
  doLogout() {
    localStorage.removeItem('active')
    this.router.navigate(['/login'])

  }

}