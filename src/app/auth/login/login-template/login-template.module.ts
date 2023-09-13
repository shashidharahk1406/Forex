import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginTemplateRoutingModule } from './login-template-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { LoginTemplateComponent } from './login-template.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [
    LoginPageComponent,
    ForgotPassComponent,
    LoginTemplateComponent
  ],
  imports: [
    CommonModule,
    LoginTemplateRoutingModule,
    SharedModule,
    NgbCarouselModule,
    MaterialModule
  ]
})
export class LoginTemplateModule { }
