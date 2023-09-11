import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  password = new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$')]);

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  ngOnInit(): void {
    
  }

  
}
