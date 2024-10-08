import { Component } from '@angular/core';
import { SignUpFormComponent } from '../../shared/forms/sign-up-form/sign-up-form.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [SignUpFormComponent, RouterOutlet, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

}
