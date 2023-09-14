import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryIdComponent } from './country-id.component';
import { CountryIdListComponent } from './country-id-list/country-id-list.component';

const routes: Routes = [
  {
    path:'', component: CountryIdComponent, children:[
      {
        path:'list', component:CountryIdListComponent 
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
export class CountryIdRoutingModule { }
