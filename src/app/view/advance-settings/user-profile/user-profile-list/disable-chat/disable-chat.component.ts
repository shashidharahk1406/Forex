import { Component, Inject,OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-disable-chat',
  templateUrl: './disable-chat.component.html',
  styleUrls: ['./disable-chat.component.css']
})
export class DisableChatComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DisableChatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }
  onNoClick(){}
}
