import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-raw-data-followup',
  templateUrl: './raw-data-followup.component.html',
  styleUrls: ['./raw-data-followup.component.css'],
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
export class RawDataFollowupComponent implements OnInit {

  isOpen = false;
  meridian = true;
  editLead!: FormGroup;
  leadCategory = ['Application','Lead','Raw Data'];
  status = ['1-Untouched','2-Campus Visit','3-Call Back','4-Enrolled','5-Not Interested'];
  subStatus = ['Fresh Lead','Send Adoption WA'];
  followupType = ['SMS','Email','Whats App'];
  constructor(private _bottomSheetRef: MatBottomSheetRef<any>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isOpen = !this.isOpen;
    this.initForm()
  }

 initForm(){
  this.editLead = this.fb.group({
    leadCategory:['',Validators.required],
    status:['',Validators.required],
    subStatus:['',Validators.required],
    followupType:['',Validators.required],
    nextActionDate:['',Validators.required],
    nextActionTime:['',Validators.required],
    followupComment:['',Validators.required]
  })
 }
 closePopup(){
  this._bottomSheetRef.dismiss()
  this.isOpen = !this.isOpen;
}
  
get f() {
  return this.editLead.controls;
}
clearSelectField(fieldName: string) {
  this.editLead.get(fieldName)?.reset();
}
onSubmit(){
  if(this.editLead.invalid){
    this.editLead.markAllAsTouched()
  }
}
selectOptionsProgrammatically() {
  const selectedValues = ['Application','Lead'];
  this.editLead.patchValue({
    leadCategory:selectedValues
  })
}

}
