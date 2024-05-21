import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/API/api.service';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';

@Component({
  selector: 'app-login-list',
  templateUrl: './login-list.component.html',
  styleUrls: ['./login-list.component.css'],
})
export class LoginListComponent implements OnInit {
  notification: boolean = false;

  name: any;
  lastname: any;
  initials!: any;
  role:any;

  constructor(private router:Router,private api:ApiService,private addEmit:AddLeadEmitterService) { 
    this.name=localStorage.getItem('username');
    this.role=localStorage.getItem('user_role')
    //console.log(this.name,"this.name");
    
  }

  ngOnInit(): void {
    this.initials = this.name?.charAt(0);
    //console.log(this.initials,"this.initials");
    
  }
  openNotification() {
    this.notification = !this.notification;
  }
  logOut() {
    window.location.reload();
    localStorage.clear();
    this.api.showSuccess('Logout Successfull');
    this.router.navigate(['/login']);
  }
}
