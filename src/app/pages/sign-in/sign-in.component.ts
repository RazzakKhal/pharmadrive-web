import { Component } from '@angular/core';
import { SignInFormComponent } from '../../shared/forms/sign-in-form/sign-in-form.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SignInFormComponent, RouterOutlet, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

}
