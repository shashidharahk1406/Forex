// auth.service.ts

import { Injectable } from '@angular/core';
import { TimerService } from './timer.service';
import { IdleDetectionService } from './idle-detection.service';
import { ApiService } from './API/api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private timerService: TimerService,
    private idleDetectionService: IdleDetectionService,
    private api:ApiService,
    private router:Router
  ) {}

  isLoggedIn() {
    // Check authentication status
    // Return true if authenticated, false otherwise
  }

  startLogoutTimer(duration: number): void {
    this.idleDetectionService.userActivity.subscribe(() => {
      this.timerService.startTimer(duration).subscribe(() => {
        this.logout();
      });
    });
  }

  logout(): void {
   localStorage.clear();
   this.api.showSuccess("Your Session Has Been Expired")
   this.router.navigate(['/login']) 
  }
}
