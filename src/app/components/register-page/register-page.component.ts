import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  form!: FormGroup

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(){
    this.form = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      email: new FormControl(null, [Validators.required, Validators.email])
    });

    this.route.queryParams.subscribe((params) => {
      if(params['registered']){

      } else if(params['accessDenied']){

      }
    });
  }

  onSubmit(){
    this.form.disable();

    const registerData = {
      login: this.form.value.login,
      password: this.form.value.password,
      email: this.form.value.email
    }

    this.auth.register(registerData).subscribe(
      {
        next: () => {
          this.router.navigate(['/login']),
          {
            queryParams: {
              registered: true
            }
          }
        },
        error: (error) => {
          console.warn(error);
          this.form.enable();
        }
      }
    )

  }

}
