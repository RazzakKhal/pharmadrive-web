import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PharmacyService } from '../../shared/services/pharmacy.service';
import { mergeMap, Observable } from 'rxjs';
import { Pharmacy } from '../../shared/models/interfaces/pharmacy';
import { CommonModule } from '@angular/common';
import { PharmacyCardComponent } from '../../shared/components/pharmacy-card/pharmacy-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../shared/services/order.service';

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
  addPharmacyDto : any;

  @ViewChild('confirmationBar') confirmationBarRef!: ElementRef<HTMLDivElement>;


  constructor(private pharmacyService : PharmacyService,private router: Router, private route: ActivatedRoute, private orderService : OrderService){}

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
    this.route.paramMap.pipe(
      mergeMap(params => {
        // Create the DTO based on the route parameter
        this.addPharmacyDto = { 
          commandeId: params.get('id'), 
          pharmacyId: this.selectedPharmacy?.id 
        };
  
        // Call the order service to add the pharmacy to the order
        return this.orderService.addPharmacyToOrder(this.addPharmacyDto);
      })
    ).subscribe(() => {
      // Redirect after successful save
      this.redirectToThanks();
    });
  }

  redirectToThanks(){
    this.router.navigateByUrl('/thanks')
  }

}
