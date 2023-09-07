import { Component, Inject,OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-replace-user',
  templateUrl: './replace-user.component.html',
  styleUrls: ['./replace-user.component.css']
})
export class ReplaceUserComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReplaceUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
