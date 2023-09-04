import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RuleEngineComponent } from './rule-engine.component';

const routes: Routes = [
  { path: '', component: RuleEngineComponent },
 ];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class RuleEngineRoutingModule { }
