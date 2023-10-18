import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-count',
  templateUrl: './generic-count.component.html',
  styleUrls: ['./generic-count.component.css']
})
export class GenericCountComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<GenericCountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    console.log(this.data,"DATA")
  }
  onSubmit() {
    this.dialogRef.close('yes'); 
  }

}
