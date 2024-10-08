import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { snackBarFailConfiguration, SnackBarMessageEnum } from '../../helpers/material.helper';
import { RegisterForm } from '../../models/classes/register-form';
import { TokenResponse } from '../../models/interfaces/token-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatSnackBarModule, CommonModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.css'
})
export class SignUpFormComponent {
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      picture: ['', Validators.required] 
    });
  }

  onSubmit() {

    if (this.registerForm.invalid) {
      snackBarFailConfiguration(this.snackBar, SnackBarMessageEnum.FAIL_FORMULAIRE)

    } else {

      const formData = new FormData();
      formData.append('name', this.registerForm.value.name);
      formData.append('firstname', this.registerForm.value.firstname);
      formData.append('email', this.registerForm.value.email);
      formData.append('password', this.registerForm.value.password);
      formData.append('picture', this.registerForm.value.picture._files[0]);
      

      this.authService.register(formData).subscribe(
        {
          next: (res: TokenResponse) => { this.authService.setToken(res.token); this.router.navigateByUrl("/"); },
          error: () => { snackBarFailConfiguration(this.snackBar, SnackBarMessageEnum.FAIL_INSCRIPTION); }
        })

    }


  }
}
