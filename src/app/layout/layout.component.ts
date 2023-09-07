import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  mobileQuery: MediaQueryList;
  
  @ViewChild('snav')snav!:MatSidenav
  private _mobileQueryListener: () => void;
  sideBarState = false;
  menuState = false;
 
 
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 1023px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  sideNavToggle(){
   // console.log(this.snav?.toggle(),"SNAV TEMPLATE---------")
    this.sideBarState = !this.sideBarState
    this.menuState = !this.menuState
  }
  ngOnInit(): void {
    
  }

}
