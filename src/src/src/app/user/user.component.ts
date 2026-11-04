import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { UserModel } from '../models/user.model';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { OrderModel } from '../models/order.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';


@Component({
  selector: 'app-user',
  imports: [ NgIf, NgFor, MatButtonModule, MatCardModule, MatButtonModule, MatTableModule, RouterLink, MatFormFieldModule, MatSelectModule, FormsModule, MatInputModule, MatExpansionModule, MatAccordion],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  public displayedColumns: string[] = ['originalTitle', 'director','location','count','price','total','status','rating'];

  public user: UserModel | null = null 
  public userCopy: UserModel | null = null
  public movieList: string[] = []


  public oldPasswordValue= ''
  public newPasswordValue =''
  public repeatPasswordValue=''



  constructor (private router: Router){
    if(!UserService.getActiveUser()){
      //vrati na homepage jer korisnik nije ulogovan
      router.navigate(['/home']) //treba home
      return 

    }
    this.user = UserService.getActiveUser()


  }

  public doChangePassword() {
    const newPassword = prompt("enter new password")
    if(newPassword == '' || newPassword == null){
      alert ("password cant be empty")
      return 
      
    }
    if (this.newPasswordValue !== this.repeatPasswordValue) {
      alert('Password dont match')
      return
    }

    if (this.oldPasswordValue !== this.user?.password) {
      alert('Password dont match')
      return
    }

    alert(
      UserService.changePassword(this.newPasswordValue) ?
        'Password has been changed' : 'Failed to change password'
    )

    this.oldPasswordValue = ''
    this.newPasswordValue = ''
    this.repeatPasswordValue = ''
   
      
    }

    public doUpdateUser() {
      if (this.userCopy == null) {
        alert('User not defined')
        return
      }
  
      UserService.updateUser(this.userCopy)
      this.user = UserService.getActiveUser()
      alert('User was updated')
    }

    public doPay(ordered: OrderModel){
      ordered.status='paid'
      if (UserService.createOrder(ordered)){
        alert('order updated')
        this.user = UserService.getActiveUser()
        return 
      }
  }

  public doCancel(order: OrderModel) {
    if (UserService.changeOrderStatus('canceled', order.movieId)) {
      this.user = UserService.getActiveUser()
    }
  }

  public doRating(order: OrderModel, r: boolean) {
    if (UserService.changeRating(r, order.movieId)) {
      this.user = UserService.getActiveUser()
    }
  }

}
