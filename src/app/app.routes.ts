
import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
 // Assurez-vous que le chemin est correct

// Définition des routes
export const routes: Routes = [
  { path: '', component:SignInComponent },  // Redirection vers sign_in par défaut
  { path: 'sign-in', component: SignInComponent },  // Route pour le composant SignIn
  { path: 'sign-up', component: SignUpComponent }   // Route pour le composant SignUp
];

