import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from '../shared/interfaces/bookInterfaces';


@Injectable({
  providedIn: 'root'
})

export class BooksService {
  constructor(private http: HttpClient){
  }

  getAll(order: string | null): Observable<IBook[]> {
    if(order != null){
      return this.http.get<IBook[]>('https://localhost:7243/api/Book?order='+order);
    }
    return this.http.get<IBook[]>('https://localhost:7243/api/Book');
  }

  getOne(id: string | null): Observable<IBook>{
    return this.http.get<IBook>('https://localhost:7243/api/Book/id/'+id);
  }

  getUserLibrary(userId: string | null, status: string | null){
    if(status == null){
      return this.http.get<IBook[]>('https://localhost:7243/api/userReading/id/' + userId + '/reading');
    }
    else{
      return this.http.get<IBook[]>('https://localhost:7243/api/userReading/id/' + userId + '/reading?status='+status);
    }
  }
}
