import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LevelOfProgramRoutingModule } from './level-of-program-routing.module';
import { LevelOfProgramComponent } from './level-of-program.component';
import { LevelOfProgramListComponent } from './level-of-program-list/level-of-program-list.component';
import { AddLevelOfProgramComponent } from './add-level-of-program/add-level-of-program.component';
import { EditLevelOfProgramComponent } from './edit-level-of-program/edit-level-of-program.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    LevelOfProgramComponent,
    LevelOfProgramListComponent,
    AddLevelOfProgramComponent,
    EditLevelOfProgramComponent
  ],
  imports: [
    CommonModule,
    LevelOfProgramRoutingModule,
     SharedModule, 
     MaterialModule
  ]
})
export class LevelOfProgramModule { }
