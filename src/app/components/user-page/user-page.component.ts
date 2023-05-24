import { Component } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces/userInterfaces';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {
  user: IUser = JSON.parse(localStorage.getItem('userData')!);
}
