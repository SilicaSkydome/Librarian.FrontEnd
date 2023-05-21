import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/shared/interfaces/userInterfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  constructor(public auth: AuthService){
  }

  getUser(): IUser{
    const user: IUser = JSON.parse(localStorage.getItem('userData')!);
    return user;
  }

  logOut(): void{
    this.auth.logOut();
  }
}
