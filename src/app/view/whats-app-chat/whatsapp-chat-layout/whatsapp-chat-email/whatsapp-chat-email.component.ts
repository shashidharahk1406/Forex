import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-whatsapp-chat-email',
  templateUrl: './whatsapp-chat-email.component.html',
  styleUrls: ['./whatsapp-chat-email.component.css'],
  animations: [
    trigger('sheetState', [
      state('open', style({
        transform: 'translateY(0)'
      })),
      state('closed', style({
        transform: 'translateY(0)'
      })),
      transition('closed => open', animate('0.10s ease-in-out')),
      transition('open => closed', animate('0.10s ease-in-out'))
    ])
  ]
})
export class WhatsappChatEmailComponent implements OnInit {

   // isOpen: boolean = false;
   emailForm!: FormGroup;
   constructor(private _bottomSheetRef: MatBottomSheetRef<any>,
     @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
     private fb: FormBuilder) {}
 
   ngOnInit(): void {
     // this.isOpen = !this.isOpen;
     this.initForm();
   }
  
   initForm(){
     this.emailForm = this.fb.group({
       primaryMobile: [false],
       fathersMobile: [false],
       mothersMobile: [false],
       alternateMobile: [false],
       emailTemplate: [''],
       selectedTemplate:[''],
       subject: ['', Validators.required],
     });
   }
   get f() {
     return this.emailForm.controls;
   }
 
   clearSelectField(fieldName: string) {
     this.emailForm.get(fieldName)?.reset();
   }
 
   onSubmit() {
     if (this.emailForm.invalid) {
       // Handle form validation errors
       return;
     }
 
     // Process form data
     const formData = this.emailForm.value;
     console.log('Form Data:', formData);
   }
   closePopup(){
     this._bottomSheetRef.dismiss()
     // this.isOpen = !this.isOpen;
   }
 }
 