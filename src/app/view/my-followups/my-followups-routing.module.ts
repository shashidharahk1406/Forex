import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MyFollowupsComponent } from './my-followups.component';
import { EditFollowupComponent } from './edit-followup/edit-followup.component';

const routes: Routes = [
  { path: '', component: MyFollowupsComponent },
  {
    path:'edit-followup/:id',component:EditFollowupComponent
  }
 ];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class MyFollowupsRoutingModule { }
