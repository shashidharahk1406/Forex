import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateRoutingModule } from './state-routing.module';
import { StateComponent } from './state.component';
import { StateListComponent } from './state-list/state-list.component';
import { AddStateComponent } from './add-state/add-state.component';
import { EditStateComponent } from './edit-state/edit-state.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    StateComponent,
    StateListComponent,
    AddStateComponent,
    EditStateComponent
  ],
  imports: [
    CommonModule,
    StateRoutingModule,
     SharedModule,
     MaterialModule
  ]
})
export class StateModule { }
