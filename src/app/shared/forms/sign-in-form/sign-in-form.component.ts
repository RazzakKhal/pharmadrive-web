import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { snackBarFailConfiguration, SnackBarMessageEnum } from '../../helpers/material.helper';
import { LoginForm } from '../../models/classes/login-form';
import { TokenResponse } from '../../models/interfaces/token-response';


@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [ ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.css'
})
export class SignInFormComponent {
  loginForm! : FormGroup

  constructor(private formBuilder : FormBuilder, private authService : AuthService , private router : Router, private snackBar : MatSnackBar) { }

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

    this.authService.login(loginForm).subscribe(
      {
        next : (res : TokenResponse) => {
          this.authService.setToken(res.token); this.router.navigateByUrl("/")
        },
        error : () => {
          snackBarFailConfiguration(this.snackBar, SnackBarMessageEnum.FAIL_CONNEXION)
        }
      }
    )
   }
  }

}
