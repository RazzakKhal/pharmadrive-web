import { Injectable } from '@angular/core';
import { Observable, Subject, take } from 'rxjs';
import { Article } from '../models/interfaces/article';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../helpers/constantes';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  selectedArticles$ = new Subject();

  constructor(private httpClient : HttpClient) { }

  getAllArticles() : Observable<Article[]>{
    return this.httpClient.get<Article[]>(`${API_URL}/articles`).pipe(
      take(1)
    );
  }

    // Méthode pour sélectionner un article + quantity
    setSelectedArticle(article: any): void {
      this.selectedArticles$.next(article);
    }
  
    // Méthode pour récupérer l'article sélectionné en tant qu'Observable 
    getSelectedArticle(): Observable<any> {
      return this.selectedArticles$.asObservable();
    }



}
