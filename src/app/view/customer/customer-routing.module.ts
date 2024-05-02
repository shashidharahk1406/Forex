import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';

const routes: Routes = [
  {
    path:'',component:CustomerComponent,children:[{
      path:'customer-layout',loadChildren:()=>import('./customer-layout/customer-layout.module').then(m=>m.CustomerLayoutModule)

    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
