import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LevelOfProgramComponent } from './level-of-program.component';
import { LevelOfProgramListComponent } from './level-of-program-list/level-of-program-list.component';

const routes: Routes = [
  {
    path:'', component: LevelOfProgramComponent, children:[
      {
        path:'list', component:LevelOfProgramListComponent
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
export class LevelOfProgramRoutingModule { }
