import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { IUpdateUser, IUser } from "../shared/interfaces/userInterfaces";


@Injectable({
  providedIn: 'root'
})
export class UserService{
  constructor(private http: HttpClient){
  }

  getUser(userId: string){
    return this.http.get<IUser>(`https://localhost:7243/api/user/userId/${userId}`);
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
            console.log(data);
          }
        )
      )
  }

  updateUser(token: string, userData: IUpdateUser, userId: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.put(`https://localhost:7243/api/user/id/${userId}`, userData, { headers: headers });
  }

}
