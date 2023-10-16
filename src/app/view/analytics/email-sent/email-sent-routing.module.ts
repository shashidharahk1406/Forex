import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailSentComponent } from './email-sent.component';
import { EmailSentTableComponent } from './email-sent-table/email-sent-table.component';

const routes: Routes = [
  {
    path:'', component:EmailSentComponent, children:[
      {
        path:'list', component:EmailSentTableComponent
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
export class EmailSentRoutingModule { }
