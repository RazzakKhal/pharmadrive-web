import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pharmacy-card',
  standalone: true,
  imports: [],
  templateUrl: './pharmacy-card.component.html',
  styleUrl: './pharmacy-card.component.css'
})
export class PharmacyCardComponent {


    @Input() id!: number;

    @Input() adressPharmacie!: string;

    @Input() nomPharmacie!: string;

    @Input() numero!: string;

    @Input() picture!: string;

}
