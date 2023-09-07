import { Component, Inject,OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-replace-user',
  templateUrl: './replace-user.component.html',
  styleUrls: ['./replace-user.component.css']
})
export class ReplaceUserComponent implements OnInit {
  selectedUser!: string;
  selectedLevel!: string;
  selectedDepartment!: string;
  constructor(
    public dialogRef: MatDialogRef<ReplaceUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }
  users: string[] = ['User 1', 'User 2', 'User 3'];
  levels: string[] = ['Level 1', 'Level 2', 'Level 3'];
  departments: string[] = ['Department 1', 'Department 2', 'Department 3'];

 

  clearUser() {
    this.selectedUser = '';
  }

  clearLevel() {
    this.selectedLevel = '';
  }

  clearDepartment() {
    this.selectedDepartment = '';
  }
}
