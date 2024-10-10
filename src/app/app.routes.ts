
import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AllArticlesComponent } from './pages/all-articles/all-articles.component';
import { AllPharmacyComponent } from './pages/all-pharmacy/all-pharmacy.component';
import { HomeClientComponent } from './pages/home-client/home-client.component';
import { HomePharmacistComponent } from './pages/home-pharmacist/home-pharmacist.component';
import { UserProfilComponent } from './pages/user-profil/user-profil.component';
 // Assurez-vous que le chemin est correct

// Définition des routes
export const routes: Routes = [
  { path: '', component:SignInComponent },  // Redirection vers sign_in par défaut
  { path: 'sign-in', component: SignInComponent },  // Route pour le composant SignIn
  { path: 'sign-up', component: SignUpComponent },  // Route pour le composant SignUp
  { path: 'all-articles', component: AllArticlesComponent },  // Route pour afficher tous les articles
  { path: 'all-pharmacy', component: AllPharmacyComponent },  // Route pour afficher toutes les pharmacies
  { path: 'home-client', component: HomeClientComponent },    // Route pour la page d'accueil client
  { path: 'home-pharmacist', component: HomePharmacistComponent }, // Route pour la page d'accueil pharmacien
  { path: 'profil', component: UserProfilComponent }, // Route pour la page profil utilisateur

];

