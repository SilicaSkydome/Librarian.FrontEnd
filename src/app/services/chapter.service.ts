import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IChapter, IChapterAdd } from "../shared/interfaces/chapterInterfaces";

@Injectable({
  providedIn: 'root'
})

export class ChapterService {
  constructor(private http: HttpClient){
  }

  getChapters(bookId: string){
    return this.http.get<IChapter[]>('https://localhost:7243/api/Chapter/BookId/' + bookId);
  }

  getChapter(chapterId: string){
    return this.http.get<IChapter>('https://localhost:7243/api/Chapter/id/' + chapterId);
  }

  addChapter(token: string, chapterData: IChapterAdd){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post('https://localhost:7243/api/Chapter', chapterData, { headers: headers });
  }
}
