import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { OrderFormComponent } from './shared/forms/order-form/order-form.component';
import { HomeClientComponent } from './pages/home-client/home-client.component';
import { AllArticlesComponent } from './pages/all-articles/all-articles.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignInComponent, SignUpComponent, HeaderComponent, HomeClientComponent, AllArticlesComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pharmadrive-web';
}
