import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PharmacyService } from '../../shared/services/pharmacy.service';
import { Observable } from 'rxjs';
import { Pharmacy } from '../../shared/models/interfaces/pharmacy';
import { CommonModule } from '@angular/common';
import { PharmacyCardComponent } from '../../shared/components/pharmacy-card/pharmacy-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-pharmacy',
  standalone: true,
  imports: [CommonModule, PharmacyCardComponent],
  templateUrl: './all-pharmacy.component.html',
  styleUrl: './all-pharmacy.component.css'
})
export class AllPharmacyComponent implements OnInit{

  pharmacies! : Observable<Pharmacy[]>
  selectedPharmacy :Pharmacy | undefined;

  @ViewChild('confirmationBar') confirmationBarRef!: ElementRef<HTMLDivElement>;


  constructor(private pharmacyService : PharmacyService,private router: Router){}

  ngOnInit(): void {
    this.pharmacies = this.getAllPharmacies();
  }

  getAllPharmacies(){
    return this.pharmacyService.getAllPharmacies()
  }

  selectAPharmacy(pharmacy : Pharmacy){
    this.selectedPharmacy = pharmacy;
    this.confirmationBarRef.nativeElement.style.bottom = '0';
  }

  saveOrder(){
    //enregistre le choix de la pharmacie
    this.redirectToThanks()
  }

  redirectToThanks(){
    this.router.navigateByUrl('/thanks')
  }

}
