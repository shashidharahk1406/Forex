import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterListModule } from './filter-list/filter-list.module';
import { LeadCountModule } from './lead-count/lead-count.module';
import { TotalApplicantsModule } from './total-applicants/total-applicants.module';
import { TotalPaidApplicationsModule } from './total-paid-applications/total-paid-applications.module';
import { TotalEnrollmentsModule } from './total-enrollments/total-enrollments.module';
import { RegisteredApplicationsModule } from './registered-applications/registered-applications.module';
import { TotalVerifiedEnquiriesModule } from './total-verified-enquiries/total-verified-enquiries.module';
import { TotalReEnquiriesModule } from './total-re-enquiries/total-re-enquiries.module';
import { EmailSentModule } from './email-sent/email-sent.module';
import { SmsSentModule } from './sms-sent/sms-sent.module';
import { CallConnectedModule } from './call-connected/call-connected.module';
import { MissedFollowupModule } from './missed-followup/missed-followup.module';
import { GraphModule } from './graph/graph.module';

@NgModule({
  declarations: [
    AnalyticsComponent,
  ],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    SharedModule,
    FilterListModule,
    LeadCountModule,
    TotalApplicantsModule, 
    TotalPaidApplicationsModule,
    TotalEnrollmentsModule,
    RegisteredApplicationsModule,
    TotalVerifiedEnquiriesModule,
    TotalReEnquiriesModule,
    EmailSentModule,
    SmsSentModule,
    CallConnectedModule, 
    MissedFollowupModule,
    GraphModule
  ]
})
export class AnalyticsModule { }
