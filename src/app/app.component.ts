import {  Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { IdleDetectionService } from './service/idle-detection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private ngxService: NgxUiLoaderService,private router:Router,private idleDetectionService:IdleDetectionService){}
  ngOnInit(){
    this.ngxService.start(); 
    setTimeout(() => {
      this.ngxService.stop();
    }, 1000);

    this.ngxService.startBackground("do-background-things");
    
    this.ngxService.stopBackground("do-background-things");

    this.ngxService.startLoader("loader-01"); 
    setTimeout(() => {
      this.ngxService.stopLoader("loader-01"); 
    }, 1000);

    this.idleDetectionService.userActivity.subscribe(isActive => {
      if (!isActive) {
       localStorage.clear()
       window.location.reload()
      }
    });
    // Subscribe to isActive to reset the timer
    // this.idleDetectionService.isActive.subscribe(isActive => {
    //   if (isActive) {
    //     this.idleDetectionService.resetTimer();
    //   } else {
    //     localStorage.clear()
    //     window.location.reload()
    //   }
      this.idleDetectionService.userActivity.subscribe(() => {
        this.idleDetectionService.resetTimer();
      });
    
    //});

    // Check for idle timeout every minute
    setInterval(() => {
      this.idleDetectionService.checkIdleTimeout();
    }, 60000); // 1 minute
  }
  
}
