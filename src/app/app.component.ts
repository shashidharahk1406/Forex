import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // mobileQuery: MediaQueryList;
  
  // @ViewChild('snav')snav?:MatSidenav
  // private _mobileQueryListener: () => void;
  // sideBarState = false;
  // menuState = false;
 
 
  // constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
  //   this.mobileQuery = media.matchMedia('(max-width: 1023px)');
  //   this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  //   this.mobileQuery.addListener(this._mobileQueryListener);
  // }
  // sideNavToggle(){
  //  // console.log(this.snav?.toggle(),"SNAV TEMPLATE---------")
  //   this.sideBarState = !this.sideBarState
  //   this.menuState = !this.menuState
  // }
}
