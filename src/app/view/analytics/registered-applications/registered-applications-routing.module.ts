import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisteredApplicationsComponent } from './registered-applications.component';
import { RegisteredApplicationTableComponent } from './registered-application-table/registered-application-table.component';

const routes: Routes = [
  {
    path:'', component:RegisteredApplicationsComponent, children:[
      {
        path:'list', component: RegisteredApplicationTableComponent
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
export class RegisteredApplicationsRoutingModule { }
