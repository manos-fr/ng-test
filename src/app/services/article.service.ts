import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Article } from '../types/Article';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get<any>(`${this.apiUrl}/posts`).pipe(
      catchError((err) => {
        throw new Error(err);
      })
    );
  }

  searchArticles(keyword: string): Observable<Article[]> {
    console.log({ keyword });
    //Not using keyword to always get results
    return this.http.get<any>(`${this.apiUrl}/posts`).pipe(
      catchError((err) => {
        throw new Error(err);
      })
    );
  }
}
