import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-application-list-view-all',
  templateUrl: './application-list-view-all.component.html',
  styleUrls: ['./application-list-view-all.component.css']
})
export class ApplicationListViewAllComponent implements OnInit {

  date = new Date();
  constructor(
    public dialogRef: MatDialogRef<ApplicationListViewAllComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb:FormBuilder) { }
  

    ngOnInit(): void {
    
    }
    
    


}
