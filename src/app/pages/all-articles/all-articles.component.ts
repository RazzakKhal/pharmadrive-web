import { Component } from '@angular/core';
import { ArticleCardComponent } from '../../shared/components/article-card/article-card.component';

@Component({
  selector: 'app-all-articles',
  standalone: true,
  imports: [ArticleCardComponent],
  templateUrl: './all-articles.component.html',
  styleUrl: './all-articles.component.css'
})
export class AllArticlesComponent {

}
