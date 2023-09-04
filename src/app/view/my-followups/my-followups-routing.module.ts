import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MyFollowupsComponent } from './my-followups.component';

const routes: Routes = [
  { path: '', component: MyFollowupsComponent },
 ];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class MyFollowupsRoutingModule { }
