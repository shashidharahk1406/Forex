import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmsSentComponent } from './sms-sent.component';
import { SmsSentTableComponent } from './sms-sent-table/sms-sent-table.component';

const routes: Routes = [
  {
    path:'', component:SmsSentComponent , children:[
      {
        path:'list', component:SmsSentTableComponent
      },
      {
        path:'', redirectTo:'list', pathMatch:'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmsSentRoutingModule { }
