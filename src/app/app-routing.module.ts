import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { PaymentButtonComponent } from './payment-button/payment-button.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';

const routes: Routes = [
  
  {
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full', 
  },
  {
    path: 'login', 
    component:LoginComponent
  },
  {
    path: 'forgotPass', 
    component:ForgotPasswordComponent
  },
  {
    path: 'reset-password/:id', 
    component:ResetPasswordComponent
  },
  {
    path: 'update-lead', 
    component:UpdateProfileComponent
  },
  {
    path: 'pay', 
    component:PaymentButtonComponent
  },
  
  { path: '', component: LayoutComponent},
  { path: '', component: LayoutComponent,children:[
    {
      path:'analytics',loadChildren:()=>import('./view/analytics/analytics.module').then(m=>m.AnalyticsModule)
    },
    {
      path:'upcomingTasks',loadChildren:()=>import('./view/upcoming-tasks/upcoming-tasks.module').then(m=>m.UpcomingTasksModule)
    },
    {
      path:'rawData',loadChildren:()=>import('./view/raw-data/raw-data.module').then(m=>m.RawDataModule)
    },
    {
      path:'leadList',loadChildren:()=>import('./view/lead-list/lead-list.module').then(m=>m.LeadListModule)
    },
    {
      path:'applicationList',loadChildren:()=>import('./view/application-list/application-list.module').then(m=>m.ApplicationListModule)
    },
    {
      path:'chatList',loadChildren:()=>import('./view/chat-list/chat-list.module').then(m=>m.ChatListModule)
    },
    {
      path:'myFollowups',loadChildren:()=>import('./view/my-followups/my-followups.module').then(m=>m.MyFollowupsModule)
    },
    {
      path:'failedLeads',loadChildren:()=>import('./view/failed-leads/failed-leads.module').then(m=>m.FailedLeadsModule)
    },
    {
      path:'bulkActions',loadChildren:()=>import('./view/bulk-actions/bulk-actions.module').then(m=>m.BulkActionsModule)
    },
    {
      path:'whatsAppChat',loadChildren:()=>import('./view/whats-app-chat/whats-app-chat.module').then(m=>m.WhatsAppChatModule)
    },
    {
      path:'marketingCampaign',loadChildren:()=>import('./view/marketing-campaign/marketing-campaign.module').then(m=>m.MarketingCampaignModule)
    },
    {
      path:'ruleEngine',loadChildren:()=>import('./view/rule-engine/rule-engine.module').then(m=>m.RuleEngineModule)
    },
    {
      path:'remarketing',loadChildren:()=>import('./view/remarketing/remarketing.module').then(m=>m.RemarketingModule)
    },
    {
      path:'customReports',loadChildren:()=>import('./view/custom-reports/custom-reports.module').then(m=>m.CustomReportsModule)
    },
    {
      path:'connectedAccounts',loadChildren:()=>import('./view/connected-accounts/connected-accounts.module').then(m=>m.ConnectedAccountsModule)
    },
    {
      path:'settings',loadChildren:()=>import('./view/settings/settings.module').then(m=>m.SettingsModule)
    },
    {
      path:'advancesettings',loadChildren:()=>import('./view/advance-settings/advance-settings.module').then(m=>m.AdvanceSettingsModule)
    },
    {
      path:'report', loadChildren:()=>import('./view/report/report.module').then(m =>m.ReportModule)
    },
    {
      path: 'transaction', 
      component:TransactionDetailsComponent
    },
  ]
  },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
