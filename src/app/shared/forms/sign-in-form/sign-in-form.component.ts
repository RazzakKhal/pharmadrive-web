import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { snackBarFailConfiguration, SnackBarMessageEnum } from '../../helpers/material.helper';
import { LoginForm } from '../../models/classes/login-form';
import { TokenResponse } from '../../models/interfaces/token-response';
import { mergeMap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../models/interfaces/user';
import { Roles } from '../../helpers/enum';


@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [ ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.css'
})
export class SignInFormComponent {
  loginForm! : FormGroup

  isPasswordVisible = false;

  constructor(private formBuilder : FormBuilder, private authService : AuthService , private router : Router, private snackBar : MatSnackBar, private userService : UserService) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  onSubmit(){
   if(this.loginForm.invalid){
    snackBarFailConfiguration(this.snackBar, SnackBarMessageEnum.FAIL_FORMULAIRE)
   }else{

    const loginForm = new LoginForm(this.loginForm.value.email, this.loginForm.value.password)

    this.authService.login(loginForm).pipe(
      mergeMap((res : TokenResponse) => {

        this.authService.setToken(res.token); 
        return this.userService.getUser()
      })
    ).subscribe(
      {
        next : (res : User) => {
          
          // récupérer le profil et rediriger sur la bonne page en fonction du role
          if(res.role === Roles.PHARMACIST){
            this.router.navigateByUrl("/home-pharmacist")
          }else{
            this.router.navigateByUrl("/home-client")
          }
        },
        error : () => {
          snackBarFailConfiguration(this.snackBar, SnackBarMessageEnum.FAIL_CONNEXION)
        }
      }
    )
   }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
