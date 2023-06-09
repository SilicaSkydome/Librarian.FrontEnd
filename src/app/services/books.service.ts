import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook, IBookAdd } from '../shared/interfaces/bookInterfaces';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  getAll(order: string | null): Observable<IBook[]> {
    if (order != null) {
      return this.http.get<IBook[]>(
        'https://localhost:7243/api/Book?order=' + order
      );
    }
    return this.http.get<IBook[]>('https://localhost:7243/api/Book');
  }

  getOne(id: string | null): Observable<IBook> {
    return this.http.get<IBook>('https://localhost:7243/api/Book/id/' + id);
  }

  getMisc(): Observable<IBook[]> {
    return this.http.get<IBook[]>('https://localhost:7243/api/Book/misc');
  }

  getBooksByAuthor(id: string): Observable<IBook[]> {
    return this.http.get<IBook[]>(
      'https://localhost:7243/api/Book/author/' + id
    );
  }

  search(page: number, name: string, tags: string[]) {
    if (tags != null && tags.length > 0) {
      const tagsStr = tags.join(',');
      if (name != '') {
        return this.http.get<IBook[]>(
          `https://localhost:7243/api/Book/search?page=${page}&name=${name}&tags=${tagsStr}`
        );
      } else {
        return this.http.get<IBook[]>(
          `https://localhost:7243/api/Book/search?page=${page}&name=null&tags=${tagsStr}`
        );
      }
    } else {
      if (name != '') {
        return this.http.get<IBook[]>(
          `https://localhost:7243/api/Book/search?page=${page}&name=${name}`
        );
      } else {
        return this.http.get<IBook[]>(
          `https://localhost:7243/api/Book/search?page=${page}&name=null`
        );
      }
    }
  }

  searchCount(name: string, tags: string[]) {
    if (tags != null && tags.length > 0) {
      const tagsStr = tags.join(',');
      if (name != '') {
        return this.http.get<number>(
          `https://localhost:7243/api/Book/searchCount?name=${name}&tags=${tagsStr}`
        );
      } else {
        return this.http.get<number>(
          `https://localhost:7243/api/Book/searchCount?name=null&tags=${tagsStr}`
        );
      }
    } else {
      if (name != '') {
        return this.http.get<number>(
          `https://localhost:7243/api/Book/searchCount?name=${name}`
        );
      } else {
        return this.http.get<number>(
          `https://localhost:7243/api/Book/searchCount?name=null`
        );
      }
    }
  }

  getUserLibrary(userId: string | null, status: string | null) {
    if (status == null) {
      return this.http.get<IBook[]>(
        'https://localhost:7243/api/userReading/id/' + userId + '/reading'
      );
    } else {
      return this.http.get<IBook[]>(
        'https://localhost:7243/api/userReading/id/' +
          userId +
          '/reading?status=' +
          status
      );
    }
  }

  addBook(token: string, bookData: IBookAdd) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post('https://localhost:7243/api/Book', bookData, {
      headers: headers,
    });
  }

  deleteBook(token: string, bookId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete('https://localhost:7243/api/Book/id/' + bookId, {
      headers: headers,
    });
  }
}
