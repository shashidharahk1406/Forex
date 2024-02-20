import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-followup-sms',
  templateUrl: './followup-sms.component.html',
  styleUrls: ['./followup-sms.component.css']
})
export class FollowupSmsComponent implements OnInit {

  smsForm!: FormGroup;
  constructor(private _bottomSheetRef: MatBottomSheetRef<any>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private fb: FormBuilder) {}

  ngOnInit(): void {
   
    this.initForm();
  }
 
  initForm(){
    this.smsForm = this.fb.group({
      // primaryMobile: [false],
      // fathersMobile: [false],
      // mothersMobile: [false],
      // alternateMobile: [false],
      smsTemplate: ['',Validators.required],
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
   
  }

}
