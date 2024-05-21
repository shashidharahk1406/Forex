import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { QuickAddComponent } from 'src/app/shared/quick-add/quick-add.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  options=['Name','Email']
  selectedOption:any;
  searchTerm:any;
  mobileQuery: any;
  name:any;
  role:any;
  _mobileQueryListener: () => void;
  notification: boolean = false;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.name=localStorage.getItem('username');
    this.role=localStorage.getItem('user_role')
  }
  onSearch(){}
  
  ngOnInit() {
   
  }

  quickAdd(){
    const dialogRef = this.dialog.open(QuickAddComponent, {
      width: '35%',
    });

    dialogRef.disableClose=true

  
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
    }); 
  }

}
