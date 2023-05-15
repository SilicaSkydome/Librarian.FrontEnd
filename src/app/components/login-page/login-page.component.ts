import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  form!: FormGroup

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(){
    this.form = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)])
    });

    this.route.queryParams.subscribe((params) => {
      if(params['registered']){

      } else if(params['accessDenied']){

      }
    });
  }

  onSubmit(){
    this.form.disable();

    const loginData = {
      login: this.form.value.login,
      password: this.form.value.password
    }

    this.auth.login(loginData).subscribe(
      {
        next: () => {
          this.router.navigate(['']);
        },
        error: (error) => {
          console.warn(error);
          this.form.enable();
        }
      }
    )

  }

}
