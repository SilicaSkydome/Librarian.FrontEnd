import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/shared/interfaces/userInterfaces';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit{
  form!: FormGroup
  user: IUser = JSON.parse(localStorage.getItem('userData')!);

  constructor(private auth: AuthService,private userServie: UserService, private router: Router){
  }

  ngOnInit(){
    this.form = new FormGroup({
      avatarUrl: new FormControl(null),
      name: new FormControl(null),
      country: new FormControl(null),
      description: new FormControl(null),
      birthDate: new FormControl(null),
    });
  };

  onSubmit(){
    this.form.disable();

    let updateData: IUser = JSON.parse(localStorage.getItem('userData')!);
    updateData.avatarUrl = this.form.value.avatarUrl
    updateData.name = this.form.value.name,
    updateData.country = this.form.value.country,
    updateData.description = this.form.value.description,
    updateData.birthDate = this.form.value.birthDate

    const token = this.auth.getToken()!;
    const userID = JSON.parse(localStorage.getItem('userData')!).id;
    this.userServie.updateUser(token, updateData, userID).subscribe(
        {
        next: () => {
          this.router.navigate(['../']);
        },
        error: (error) => {
          console.warn(error);
          this.form.enable();
        }
      }
    );
  };
}
