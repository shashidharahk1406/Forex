import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advance-settings',
  templateUrl: './advance-settings.component.html',
  styleUrls: ['./advance-settings.component.css'],
})
export class AdvanceSettingsComponent implements OnInit {
  dropDownValues: any;
  userRolesAndProfiles: any;
  userRolesAndProfilesBooleanValue: boolean;
  advanceCommunicationSettings: any;
  advanceCommunicationSettingsBooleanValue: boolean;
  dropDownValuesbooleanvalue: boolean;

  constructor(private router: Router) {
    this.dropDownValues = localStorage.getItem('dropDownValues');
    this.dropDownValuesbooleanvalue=JSON.parse(this.dropDownValues);
    console.log(this.dropDownValuesbooleanvalue, JSON.parse(this.dropDownValues), 'ddv');
    this.userRolesAndProfiles = localStorage.getItem('user_and_roles');
    this.userRolesAndProfilesBooleanValue = JSON.parse(this.userRolesAndProfiles);
    console.log(this.userRolesAndProfilesBooleanValue, 'userpro');
    this.advanceCommunicationSettings=localStorage.getItem('adv_comm_sett');
    this.advanceCommunicationSettingsBooleanValue = JSON.parse(this.advanceCommunicationSettings);
    console.log(this.advanceCommunicationSettingsBooleanValue);
  }

  ngOnInit(): void {}
  getUserData() {
    this.router.navigate(['./userProfile']);
  }
}
