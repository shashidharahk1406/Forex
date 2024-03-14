import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/API/api.service';

@Component({
  selector: 'app-advance-settings',
  templateUrl: './advance-settings.component.html',
  styleUrls: ['./advance-settings.component.css'],
})
export class AdvanceSettingsComponent implements OnInit {
  dropDownValues: any;
  userRolesAndProfiles: any;
  communications:any;
  permissions:any;

  constructor(private router: Router,private api:ApiService) {
    // this.permissions=localStorage.getItem('decodedToken')
    console.log(this.permissions,)

   this.dropDownValues=localStorage.getItem('Dropdown Values')
   console.log(this.dropDownValues,"this.permissions")
   this.userRolesAndProfiles=localStorage.getItem('User and Roles')
   console.log(this.userRolesAndProfiles,"this.permissions")
   this.communications=localStorage.getItem('Communications')
   console.log(this.communications,"this.permissions")
   
  }
    
    

  ngOnInit(): void {
    // this.showErrorMesage();
  }
  getUserData() {
    this.router.navigate(['./userProfile']);
  }

//   showErrorMesage(){
// if(this.dropDownValuesbooleanvalue && this.userRolesAndProfilesBooleanValue && this.advanceCommunicationSettingsBooleanValue){
// alert('User does not have Permissions')
// }
//   }

}
