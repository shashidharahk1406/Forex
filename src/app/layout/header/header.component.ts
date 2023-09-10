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
  _mobileQueryListener: () => void;
  notification: boolean = false;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  onSearch(){}
  
  ngOnInit() {
   
  }

  quickAdd(){
    const dialogRef = this.dialog.open(QuickAddComponent, {
      width: '50%',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    }); 
  }

}
