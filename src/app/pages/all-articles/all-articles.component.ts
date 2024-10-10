import { Component } from '@angular/core';
import { ArticleCardComponent } from '../../shared/components/article-card/article-card.component';
import { BottomSheetComponent } from '../../shared/components/bottom-sheet/bottom-sheet.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-articles',
  standalone: true,
  imports: [ArticleCardComponent, BottomSheetComponent, CommonModule],
  templateUrl: './all-articles.component.html',
  styleUrl: './all-articles.component.css'
})
export class AllArticlesComponent {

}
