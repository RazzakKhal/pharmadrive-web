import { Component, OnInit } from '@angular/core';
import { PharmacyService } from '../../shared/services/pharmacy.service';
import { Observable } from 'rxjs';
import { Pharmacy } from '../../shared/models/interfaces/pharmacy';
import { CommonModule } from '@angular/common';
import { PharmacyCardComponent } from '../../shared/components/pharmacy-card/pharmacy-card.component';

@Component({
  selector: 'app-all-pharmacy',
  standalone: true,
  imports: [CommonModule, PharmacyCardComponent],
  templateUrl: './all-pharmacy.component.html',
  styleUrl: './all-pharmacy.component.css'
})
export class AllPharmacyComponent implements OnInit{

  pharmacies! : Observable<Pharmacy[]>

  constructor(private pharmacyService : PharmacyService){}

  ngOnInit(): void {
    this.pharmacies = this.getAllPharmacies();
  }

  getAllPharmacies(){
    return this.pharmacyService.getAllPharmacies()
  }

}
