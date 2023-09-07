import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advance-settings',
  templateUrl: './advance-settings.component.html',
  styleUrls: ['./advance-settings.component.css']
})
export class AdvanceSettingsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  getUserData(){
    this.router.navigate(['./userProfile'])
  }
}
