import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-raw-data-view-all',
  templateUrl: './raw-data-view-all.component.html',
  styleUrls: ['./raw-data-view-all.component.css']
})
export class RawDataViewAllComponent implements OnInit {

  date = new Date();
  constructor(
    public dialogRef: MatDialogRef<RawDataViewAllComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb:FormBuilder) { }
  

    ngOnInit(): void {
    
    }
    

}
