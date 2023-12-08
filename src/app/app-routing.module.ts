import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { PaymentButtonComponent } from './payment-button/payment-button.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { AuthGuardGuard } from './service/auth-guard/auth-guard.guard';

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
      path:'analytics',loadChildren:()=>import('./view/analytics/analytics.module').then(m=>m.AnalyticsModule),canActivate:[AuthGuardGuard]
    },
    {
      path:'upcomingTasks',loadChildren:()=>import('./view/upcoming-tasks/upcoming-tasks.module').then(m=>m.UpcomingTasksModule),canActivate:[AuthGuardGuard]
    },
    {
      path:'rawData',loadChildren:()=>import('./view/raw-data/raw-data.module').then(m=>m.RawDataModule),canActivate:[AuthGuardGuard]
    },
    {
      path:'leadList',loadChildren:()=>import('./view/lead-list/lead-list.module').then(m=>m.LeadListModule),canActivate:[AuthGuardGuard]
    },
    {
      path:'applicationList',loadChildren:()=>import('./view/application-list/application-list.module').then(m=>m.ApplicationListModule),canActivate:[AuthGuardGuard]
    },
    {
      path:'chatList',loadChildren:()=>import('./view/chat-list/chat-list.module').then(m=>m.ChatListModule),canActivate:[AuthGuardGuard]
    },
    {
      path:'myFollowups',loadChildren:()=>import('./view/my-followups/my-followups.module').then(m=>m.MyFollowupsModule),canActivate:[AuthGuardGuard]
    },
    {
      path:'failedLeads',loadChildren:()=>import('./view/failed-leads/failed-leads.module').then(m=>m.FailedLeadsModule),canActivate:[AuthGuardGuard]
    },
    {
      path:'bulkActions',loadChildren:()=>import('./view/bulk-actions/bulk-actions.module').then(m=>m.BulkActionsModule),canActivate:[AuthGuardGuard]
    },
    {
      path:'whatsAppChat',loadChildren:()=>import('./view/whats-app-chat/whats-app-chat.module').then(m=>m.WhatsAppChatModule),canActivate:[AuthGuardGuard]
    },
    {
      path:'marketingCampaign',loadChildren:()=>import('./view/marketing-campaign/marketing-campaign.module').then(m=>m.MarketingCampaignModule),canActivate:[AuthGuardGuard]
    },
    {
      path:'ruleEngine',loadChildren:()=>import('./view/rule-engine/rule-engine.module').then(m=>m.RuleEngineModule),canActivate:[AuthGuardGuard]
    },
    {
      path:'remarketing',loadChildren:()=>import('./view/remarketing/remarketing.module').then(m=>m.RemarketingModule),canActivate:[AuthGuardGuard]
    },
    {
      path:'customReports',loadChildren:()=>import('./view/custom-reports/custom-reports.module').then(m=>m.CustomReportsModule),canActivate:[AuthGuardGuard]
    },
    {
      path:'connectedAccounts',loadChildren:()=>import('./view/connected-accounts/connected-accounts.module').then(m=>m.ConnectedAccountsModule),canActivate:[AuthGuardGuard]
    },
    {
      path:'settings',loadChildren:()=>import('./view/settings/settings.module').then(m=>m.SettingsModule),canActivate:[AuthGuardGuard]
    },
    {
      path:'advancesettings',loadChildren:()=>import('./view/advance-settings/advance-settings.module').then(m=>m.AdvanceSettingsModule),canActivate:[AuthGuardGuard]
    },
    {
      path:'report', loadChildren:()=>import('./view/report/report.module').then(m =>m.ReportModule),canActivate:[AuthGuardGuard]
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
