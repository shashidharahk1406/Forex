import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsComponent } from './analytics.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: AnalyticsComponent,children:[
    
      {path:'filterList',loadChildren:()=>import('./filter-list/filter-list.module').then(m=>m.FilterListModule)},
      // {path:'',pathMatch:'full',redirectTo:'filterList'},

    
  ] },
  {
    path:'leadCount', loadChildren:()=> import('./lead-count/lead-count.module').then(m=>m.LeadCountModule)
  },
  {
    path:'totalApplications', loadChildren:()=>import ('./total-applicants/total-applicants.module').then(m => m.TotalApplicantsModule)
  },
  {
    path:'totalPaidApplications', loadChildren:()=> import('./total-paid-applications/total-paid-applications.module').then(m=>m.TotalPaidApplicationsModule)
  },
  {
    path:'totalEnrollments', loadChildren:()=> import('./total-enrollments/total-enrollments.module').then(m => m.TotalEnrollmentsModule)
  },
  {
    path:'registeredApplications', loadChildren:()=> import('./registered-applications/registered-applications.module').then(m=> m.RegisteredApplicationsModule)
  },
  {
    path:'totalVerfiedEnquiries', loadChildren:()=> import('./total-verified-enquiries/total-verified-enquiries.module').then(m => m.TotalVerifiedEnquiriesModule)
  },
  {
    path:'totalReEnquiries', loadChildren:()=> import('./total-re-enquiries/total-re-enquiries.module').then(m => m.TotalReEnquiriesModule)
  },
  {
    path:'emailSent', loadChildren:()=> import('./email-sent/email-sent.module').then(m => m.EmailSentModule)
  },
  {
    path:'smsSent', loadChildren:()=> import('./sms-sent/sms-sent.module').then(m => m.SmsSentModule)
  },
  {
    path:'callConnected', loadChildren:()=> import ('./call-connected/call-connected.module').then(m => m.CallConnectedModule)
  },
  {
    path:'missedFollowup', loadChildren:()=> import('./missed-followup/missed-followup.module').then(m => m.MissedFollowupModule)
  }

  
 
 ];

 @NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule { }
