import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubStatusRoutingModule } from './sub-status-routing.module';
import { SubStatusComponent } from './sub-status.component';

import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    SubStatusComponent,
    ListComponent,
    EditComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    SubStatusRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class SubStatusModule { }
