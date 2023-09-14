import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriorityNameRoutingModule } from './priority-name-routing.module';
import { PriorityNameComponent } from './priority-name.component';
import { PriorityNameListComponent } from './priority-name-list/priority-name-list.component';
import { AddPriorityNameComponent } from './add-priority-name/add-priority-name.component';
import { EditPriorityNameComponent } from './edit-priority-name/edit-priority-name.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    PriorityNameComponent,
    PriorityNameListComponent,
    AddPriorityNameComponent,
    EditPriorityNameComponent
  ],
  imports: [
    CommonModule,
    PriorityNameRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class PriorityNameModule { }
