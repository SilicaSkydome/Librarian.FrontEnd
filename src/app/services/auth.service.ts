import { Observable, tap } from 'rxjs';
import { Injectable } from "@angular/core";
import { ILogin, ISignIn } from "../shared/interfaces/userInterfaces";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private token: string | null = null;

  constructor(private http: HttpClient) {
  }

  register(registerData: ISignIn){
    return this.http.post('https://localhost:7243/api/User', registerData);
  }

  login(loginData: ILogin): Observable<{token: string}> {
    return this.http.post<{token: string}>('https://localhost:7243/api/Login', loginData)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-token', token);
            this.setToken(token);
          }
        )
      )
  }

  setToken(token: string | null) {
    this.token = token;
  }
  getToken(): string | null{
    return this.token;
  }
  isAuthenticated(): boolean{
    return !!this.token;
  }
  logOut(){
    this.setToken(null);
    localStorage.clear();
  }
}
