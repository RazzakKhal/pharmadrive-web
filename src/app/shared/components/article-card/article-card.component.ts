import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css'
})
export class ArticleCardComponent {

  constructor(private articleService : ArticleService){}
  quantity: number = 0;

  @Input() idArticle!: number;

  @Input() price!: number;

  @Input() nameArticle!: string;

  @Input() isRefundable!: boolean;

  @Input() picture!: string;


  increaseQuantity() {
    this.quantity += 1;
    this.articleService.setSelectedArticle({ name: this.nameArticle, quantity: this.quantity, unitPrice: this.price, totalPrice: this.price * this.quantity })
  }

  decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity -= 1;
      this.articleService.setSelectedArticle({ name: this.nameArticle, quantity: this.quantity, unitPrice: this.price, totalPrice: this.price * this.quantity })

    }
  }
}
