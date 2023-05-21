import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { IUser } from "../shared/interfaces/userInterfaces";


@Injectable({
  providedIn: 'root'
})
export class UserService{
  constructor(private http: HttpClient){
  }

  getUserData(token: string, login: string): Observable<IUser>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<IUser>(`https://localhost:7243/api/user/login/${login}`, { headers: headers })
      .pipe(
        tap(
          (data) => {
            localStorage.setItem('userData', JSON.stringify(data));
          }
        )
      )
  }



}
