import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Article } from '../models/interfaces/article';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../helpers/constantes';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient : HttpClient) { }

  getAllArticles() : Observable<Article[]>{
    return this.httpClient.get<Article[]>(`${API_URL}/articles`).pipe(
      take(1)
    );
  }
}
