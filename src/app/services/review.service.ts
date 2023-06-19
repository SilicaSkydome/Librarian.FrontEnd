import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReview, IReviewAdd } from '../shared/interfaces/reviewInterface';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  getReviews(page: number, bookId: string): Observable<IReview[]> {
    return this.http.get<IReview[]>(
      'https://localhost:7243/api/review/bookid/' + bookId + '?page=' + page
    );
  }

  getReviewsCount(bookId: string): Observable<number> {
    return this.http.get<number>(
      'https://localhost:7243/api/review/bookid/' + bookId + '/count'
    );
  }

  addReview(token: string, reviewData: IReviewAdd) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post('https://localhost:7243/api/Review', reviewData, {
      headers: headers,
    });
  }

  deleteReview(token: string, id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete('https://localhost:7243/api/Review/id/' + id, {
      headers: headers,
    });
  }
}
