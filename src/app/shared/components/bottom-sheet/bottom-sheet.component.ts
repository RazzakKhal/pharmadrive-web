import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-bottom-sheet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.css'
})

export class BottomSheetComponent implements OnInit{
  constructor(public router:Router, private articleService : ArticleService, private orderService : OrderService){}

  ngOnInit(): void {
    this.articleService.getSelectedArticle().subscribe((item) => {
      this.basketItems = this.basketItems.filter((art : any) => art.name !== item.name)
      this.basketItems.push(item)
    })
  }
  isExpanded = false;

  basketItems : any= [];


  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  confirmOrder() {

    // creation de la commande sans choix de la pharmacie
    this.orderService.createOrder({articles : this.basketItems}).subscribe((res : any) => {
      this.router.navigateByUrl(`/all-pharmacy/${res.idCommande}`)
    })
  }
}
