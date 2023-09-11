import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunicationRoutingModule } from './communication-routing.module';
import { CommunicationComponent } from './communication.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CommunicationComponent
  ],
  imports: [
    CommonModule,
    CommunicationRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class CommunicationModule { }
