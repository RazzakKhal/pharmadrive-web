import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Pharmacy } from '../../shared/models/interfaces/pharmacy';
import { PharmacyService } from '../../shared/services/pharmacy.service';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-thanks',
  standalone: true,
  imports: [],
  templateUrl: './thanks.component.html',
  styleUrl: './thanks.component.css'
})
export class ThanksComponent implements OnInit {

  pharmacy: Pharmacy | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private pharmacyService: PharmacyService) { }
  ngOnInit(): void {
    this.getPharmacy()
  }

  redirectToOrder() {
    this.router.navigateByUrl('/home-client')
  }

  getPharmacy() {
    this.route.paramMap.pipe(
      mergeMap((params: ParamMap) => {
        return this.pharmacyService.getPharmacy(parseInt(params.get('id') as string));
      })
    ).subscribe((pharma) => {
      this.pharmacy = pharma;
    })
  }

}
