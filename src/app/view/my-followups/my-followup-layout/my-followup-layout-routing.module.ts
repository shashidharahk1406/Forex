import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyFollowupCardContentComponent } from './my-followup-card-content/my-followup-card-content.component';

const routes: Routes = [{
  path:'myfollowup-card-content',component:MyFollowupCardContentComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyFollowupLayoutRoutingModule { }
