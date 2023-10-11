import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { SidenavListComponent } from './layout/sidenav-list/sidenav-list.component';
import { DashboradComponent } from './view/dashborad/dashborad.component';
import { CommonModule, DatePipe } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LoginComponent } from './auth/login/login.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { NgChartsModule } from 'ng2-charts';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthInterceptor } from './service/Auth-interceptor/auth-interceptor';

import {
  NgxUiLoaderHttpModule, NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
} from "ngx-ui-loader";
import { ToastrModule } from 'ngx-toastr';
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "red",
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 20,
  bgsType: SPINNER.rectangleBouncePulseOutRapid, // background spinner type
  fgsType: SPINNER.rectangleBouncePulseOutRapid, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
  fgsSize:50
};
import { QuillModule } from 'ngx-quill'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    DashboradComponent,
    LayoutComponent,
    LoginComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    NgbCarouselModule,
    NgChartsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass:"toast-top-right",
      preventDuplicates: true,
      closeButton:true,
    }),
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true
    }),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    QuillModule
  ],
  exports:[
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [DatePipe,{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
  provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }
