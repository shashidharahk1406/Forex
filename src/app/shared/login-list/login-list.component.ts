import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-list',
  templateUrl: './login-list.component.html',
  styleUrls: ['./login-list.component.css']
})
export class LoginListComponent implements OnInit {
  notification: boolean = false;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  openNotification(){
    this.notification = !this.notification
  }
  logOut(){
   this.router.navigate(['/login'])
  }
}
