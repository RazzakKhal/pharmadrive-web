import { Component } from '@angular/core';
import { OrderFormComponent } from '../../shared/forms/order-form/order-form.component';

@Component({
  selector: 'app-home-client',
  standalone: true,
  imports: [OrderFormComponent],
  templateUrl: './home-client.component.html',
  styleUrl: './home-client.component.css'
})
export class HomeClientComponent {

}
