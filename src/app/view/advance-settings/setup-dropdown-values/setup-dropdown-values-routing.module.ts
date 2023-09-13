import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupDropdownValuesComponent } from './setup-dropdown-values.component';

const routes: Routes = [
  {
    path:'', component:SetupDropdownValuesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupDropdownValuesRoutingModule { }
