import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-sheet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.css'
})

export class BottomSheetComponent {
  constructor(public router:Router){}
  isExpanded = false;

  basketItems = [
    { name: 'Doliprane', quantity: 1, unitPrice: 5, totalPrice: 5 },
    { name: 'Levemir', quantity: 2, unitPrice: 6, totalPrice: 12 },
  ];

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  confirmOrder() {
    this.router.navigateByUrl('/all-pharmacy')
  }
}
