import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphRoutingModule } from './graph-routing.module';
import { GraphComponent } from './graph.component';
import { LeadFunnelByStatusComponent } from './lead-funnel-by-status/lead-funnel-by-status.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { ApplicationFunnelByStatusComponent } from './application-funnel-by-status/application-funnel-by-status.component';
import { LeadCountBySourceComponent } from './lead-count-by-source/lead-count-by-source.component';
import { ApplicationCountBySourceComponent } from './application-count-by-source/application-count-by-source.component';
import { LeadCountByCounselorComponent } from './lead-count-by-counselor/lead-count-by-counselor.component';
import { ApplicationCountByCounselorComponent } from './application-count-by-counselor/application-count-by-counselor.component';
import { TopReasonsForAllLeadsComponent } from './top-reasons-for-all-leads/top-reasons-for-all-leads.component';
import { SingleLineDailyLeadTrendComponent } from './single-line-daily-lead-trend/single-line-daily-lead-trend.component';
import { ApplicationTimelineReportComponent } from './application-timeline-report/application-timeline-report.component';
import { TwoDimensionMultiLineChartComponent } from './two-dimension-multi-line-chart/two-dimension-multi-line-chart.component';
import { LeadVerificationReportComponent } from './lead-verification-report/lead-verification-report.component';
import { CommunicationSummaryComponent } from './communication-summary/communication-summary.component';
import { MonthlyEnrollmentsComponent } from './monthly-enrollments/monthly-enrollments.component';
import { TopPerformingCounselorComponent } from './top-performing-counselor/top-performing-counselor.component';


@NgModule({
  declarations: [
    GraphComponent,
    LeadFunnelByStatusComponent,
    ApplicationFunnelByStatusComponent,
    LeadCountBySourceComponent,
    ApplicationCountBySourceComponent,
    LeadCountByCounselorComponent,
    ApplicationCountByCounselorComponent,
    TopReasonsForAllLeadsComponent,
    SingleLineDailyLeadTrendComponent,
    ApplicationTimelineReportComponent,
    TwoDimensionMultiLineChartComponent,
    LeadVerificationReportComponent,
    CommunicationSummaryComponent,
    MonthlyEnrollmentsComponent,
    TopPerformingCounselorComponent
  ],
  imports: [
    CommonModule,
    GraphRoutingModule,
    SharedModule,
    MaterialModule
  ],
  exports:[
    LeadFunnelByStatusComponent,
    ApplicationFunnelByStatusComponent,
    LeadCountBySourceComponent,
    ApplicationCountBySourceComponent,
    LeadCountByCounselorComponent,
    ApplicationCountByCounselorComponent,
    TopReasonsForAllLeadsComponent,
    SingleLineDailyLeadTrendComponent,
    ApplicationTimelineReportComponent,
    TwoDimensionMultiLineChartComponent,
    LeadVerificationReportComponent,
    CommunicationSummaryComponent,
    MonthlyEnrollmentsComponent,
    TopPerformingCounselorComponent
  ]
})
export class GraphModule { }
