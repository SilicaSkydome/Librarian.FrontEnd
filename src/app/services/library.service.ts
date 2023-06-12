import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LibraryAdd } from "../shared/interfaces/libraryInterfaces";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  constructor(private http: HttpClient){
  }

  addToLibrary(token: string | null, status: LibraryAdd){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });


    return this.http.post('https://localhost:7243/api/UserReading', status, {headers: headers});
  }
}
