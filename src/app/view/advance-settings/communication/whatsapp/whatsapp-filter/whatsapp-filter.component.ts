import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-whatsapp-filter',
  templateUrl: './whatsapp-filter.component.html',
  styleUrls: ['./whatsapp-filter.component.css']
})
export class WhatsappFilterComponent implements OnInit {
  filterUser!:FormGroup;
  constructor(
    public dialogRef: MatDialogRef<WhatsappFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder
   ) {
  }

  ngOnInit(): void {
    this.initForm()
  }
 initForm(){
  this.filterUser = this.fb.group({
    whatsappType: [''],
    templateStatus: [''],
    createdBy: [''],
    updatedBy: [''],
    creationFrom: [''],
    creationTo: [''],
    modificationFrom: [''],
    modificationTo: [''],
    
  });
 }
}
