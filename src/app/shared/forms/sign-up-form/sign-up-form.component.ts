import { Component, ElementRef, ViewChild } from '@angular/core';
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
  selectedFile!: File;

  @ViewChild('pictureInputDeep') pictureInputDeep!: ElementRef<HTMLDivElement>; // Ref to the container of the input
  @ViewChild('imageCarteVitale') imageCarteVitale!: ElementRef<HTMLImageElement>; // Ref to the image inside the container

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
      if (this.selectedFile) {
        const formData = new FormData();
      formData.append('name', this.registerForm.value.name);
      formData.append('firstname', this.registerForm.value.firstname);
      formData.append('email', this.registerForm.value.email);
      formData.append('password', this.registerForm.value.password);
      formData.append('picture', this.selectedFile);
      

      this.authService.register(formData).subscribe(
        {
          next: (res: TokenResponse) => { this.authService.setToken(res.token); this.router.navigateByUrl("/"); },
          error: () => { snackBarFailConfiguration(this.snackBar, SnackBarMessageEnum.FAIL_INSCRIPTION); }
        })

      }else{
        snackBarFailConfiguration(this.snackBar, SnackBarMessageEnum.FAIL_CONNEXION)

      }

    }


  }

   // Handle file selection
   onFileSelected(event: any): void {
    const file = event.target.files[0];  // Get the selected file
    if (file) {
      this.selectedFile = file;  // Store it in a class property
      this.replaceFolderPicture(file)
    }
  }


  replaceFolderPicture(file : File){
        // Remove the image using @ViewChild reference
        if (this.imageCarteVitale) {
          this.imageCarteVitale.nativeElement.remove();  // Remove the image
        }
  
        // Remove existing file name display, if present
        const existingFileNameDisplay = this.pictureInputDeep.nativeElement.querySelector('.nom-picture');
        if (existingFileNameDisplay) {
          existingFileNameDisplay.remove(); // Remove if a filename is already shown
        }
  
        // Create a new div to show the file name
        const fileNameDiv = document.createElement('div');
        fileNameDiv.classList.add('nom-picture');  // Add the class
        fileNameDiv.textContent = file.name;  // Set the file name as text content
  
        this.pictureInputDeep.nativeElement.appendChild(fileNameDiv);  // Append the div inside the picture input deep container
  }
}
