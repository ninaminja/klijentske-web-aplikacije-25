import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButton, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public email: string =''
  public password : string = ''

  constructor(private router: Router) {
    if(UserService.getActiveUser()){
      router.navigate(['/user'])
      return 
  }
}

public doLogin(){
 if  (UserService.login(this.email, this.password)){
  //redirect to user comp
  this.router.navigate(['/user'])
  return 
 }
 alert('Wrong email or password')
}
}
