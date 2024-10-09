import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { snackBarFailConfiguration, SnackBarMessageEnum } from '../../helpers/material.helper';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatSnackBarModule, CommonModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit{

  orderForm! : FormGroup
  selectedFile!: File;

  @ViewChild('pictureInputDeep') pictureInputDeep!: ElementRef<HTMLDivElement>; // Ref to the container of the input
  @ViewChild('imageCarteVitale') imageCarteVitale!: ElementRef<HTMLImageElement>; // Ref to the image inside the container

  constructor(private formBuilder : FormBuilder, private orderService : OrderService , private router : Router, private snackBar : MatSnackBar){ }

  ngOnInit(): void {

    this.orderForm = this.formBuilder.group({
      picture : ['', Validators.required]
    })
  }

  onSubmit(){
   if(this.orderForm.invalid){
    snackBarFailConfiguration(this.snackBar, SnackBarMessageEnum.FAIL_FORMULAIRE)
   }else{



    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('picture', this.selectedFile);
    

      this.orderService.createOrdonnance(formData).subscribe(
      {
        next: (res: any) => { this.router.navigateByUrl("/articles"); },
        error: () => { snackBarFailConfiguration(this.snackBar, SnackBarMessageEnum.FAIL_INSCRIPTION); }
      })

    }else{
      snackBarFailConfiguration(this.snackBar, SnackBarMessageEnum.FAIL_ORDONNANCE)

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
