import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lead-sms',
  templateUrl: './lead-sms.component.html',
  styleUrls: ['./lead-sms.component.css'],
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
export class LeadSMSComponent implements OnInit {
  isOpen: boolean =false;
  smsForm!: FormGroup;
  constructor(private _bottomSheetRef: MatBottomSheetRef<any>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isOpen = !this.isOpen;
    this.initForm();
  }
 
  initForm(){
    this.smsForm = this.fb.group({
      primaryMobile: [false],
      fathersMobile: [false],
      mothersMobile: [false],
      alternateMobile: [false],
      smsTemplate: [''],
      selectedTemplate:[''],
      route: ['', Validators.required],
    });
  }
  

  get f() {
    return this.smsForm.controls;
  }

  clearSelectField(fieldName: string) {
    this.smsForm.get(fieldName)?.reset();
  }

  onSubmit() {
    if (this.smsForm.invalid) {
      // Handle form validation errors
      return;
    }

    // Process form data
    const formData = this.smsForm.value;
    console.log('Form Data:', formData);
  }
  closePopup(){
    this._bottomSheetRef.dismiss()
    this.isOpen = !this.isOpen;
  }
}
