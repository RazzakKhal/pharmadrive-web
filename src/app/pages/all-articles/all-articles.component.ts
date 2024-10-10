import { Component, OnInit } from '@angular/core';
import { ArticleCardComponent } from '../../shared/components/article-card/article-card.component';
import { BottomSheetComponent } from '../../shared/components/bottom-sheet/bottom-sheet.component';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../shared/services/article.service';
import { Article } from '../../shared/models/interfaces/article';

@Component({
  selector: 'app-all-articles',
  standalone: true,
  imports: [ArticleCardComponent, BottomSheetComponent, CommonModule],
  templateUrl: './all-articles.component.html',
  styleUrl: './all-articles.component.css'
})
export class AllArticlesComponent implements OnInit{

  allArticles : Article[] = []

  constructor(private articleService : ArticleService){}

  ngOnInit(): void {

    this.getAllArticles()
  }

  getAllArticles(){
    this.articleService.getAllArticles().subscribe((articles) => {this.allArticles=articles; console.log(articles)})
  }

}
