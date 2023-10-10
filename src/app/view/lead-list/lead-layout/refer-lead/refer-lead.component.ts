import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-refer-lead',
  templateUrl: './refer-lead.component.html',
  styleUrls: ['./refer-lead.component.css']
})
export class ReferLeadComponent implements OnInit {
  referLeadForm!:FormGroup;
  referTo = ['Abhishek','Vijay','Ajith','Surya','Salman']
  constructor(
    public dialogRef: MatDialogRef<ReferLeadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb:FormBuilder) { }
    
    get f() {
      return this.referLeadForm.controls;
    }
  
    clearSelectField(fieldName: string) {
      this.referLeadForm.get(fieldName)?.reset();
    }
  
    onSubmit() {
      if (this.referLeadForm.invalid) {
        // Handle form validation errors
        return;
      }
  
      // Process form data
      const formData = this.referLeadForm.value;
      console.log('Form Data:', formData);
    }
    
    ngOnInit(): void {
      this.initForm()
    }
    initForm(){
      this.referLeadForm = this._fb.group({
        referTo:['',Validators.required],
        comment:['',Validators.required]
      })
    }
}
