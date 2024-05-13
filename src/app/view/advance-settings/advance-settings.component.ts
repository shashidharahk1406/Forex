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
    this.permissions=localStorage.getItem('decodedToken')
    //console.log(JSON.parse(this.permissions).permissions.find((perm:any)=>perm.menu_name==='Advance Settings'),"this.permissions");
    
    let accesspermissions=JSON.parse(this.permissions).permissions.find((perm:any)=>perm.menu_name==='Advance Settings')
    accesspermissions.children_status.forEach((element:any) => {
      if(element.menu_name=='Dropdown Values'){
        this.dropDownValues=element.access_status;
      //  console.log(this.dropDownValues,"this.dropDownValues");
        
      }
      if(element.menu_name=='User and Roles'){
        this.userRolesAndProfiles=element.access_status
      }
      if(element.menu_name=='Communications'){
        this.communications=element.access_status
      }
    });

  //  var dropDownValues=localStorage.getItem('Dropdown Values');
  //  var resp=JSON.parse(this.dropDownValues)
  //  console.log(this.dropDownValues,"this.permissions")
  //  this.userRolesAndProfiles=localStorage.getItem('User and Roles')
  //  console.log(this.userRolesAndProfiles,"this.permissions")
  //  this.communications=localStorage.getItem('Communications')
  //  console.log(this.communications,"this.permissions")
   
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
