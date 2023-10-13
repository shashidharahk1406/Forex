import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-delete',
  templateUrl: './generic-delete.component.html',
  styleUrls: ['./generic-delete.component.css']
})
export class GenericDeleteComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<GenericDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    console.log(this.data,"DATA")
  }
  onSubmit() {
    this.dialogRef.close('yes'); // This assumes you're using MatDialog to create the dialog.
  }
}
