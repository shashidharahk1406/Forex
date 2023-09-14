import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediumRoutingModule } from './medium-routing.module';
import { MediumComponent } from './medium.component';
import { MediumListComponent } from './medium-list/medium-list.component';
import { AddMediumComponent } from './add-medium/add-medium.component';
import { EditMediumComponent } from './edit-medium/edit-medium.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    MediumComponent,
    MediumListComponent,
    AddMediumComponent,
    EditMediumComponent
  ],
  imports: [
    CommonModule,
    MediumRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class MediumModule { }
