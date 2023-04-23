import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBook } from '../modules/book';
import { Observable } from 'rxjs';


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
}