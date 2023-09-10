import { Component, OnInit, ViewChild,HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonServiceService } from '../service/common-service.service';



@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
 @ViewChild(MatSidenav)sidenav!:MatSidenav;
  sideBarState = false;
  menuState = false;
  mobileView = false;
 constructor(private commonService:CommonServiceService){}
  sideNavToggle(){
    this.sideBarState = !this.sideBarState
    this.menuState = !this.menuState
  }
  
  ngOnInit() {
    this.checkScreenSize();
  
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
      if (window.innerWidth <= 800) {
       
        this.mobileView = true;
      } else {

        this.mobileView = false;
      }
  
  }
    
   
    
    

}
