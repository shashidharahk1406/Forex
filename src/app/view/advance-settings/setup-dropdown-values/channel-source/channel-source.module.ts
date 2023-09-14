import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChannelSourceRoutingModule } from './channel-source-routing.module';
import { ChannelSourceComponent } from './channel-source.component';
import { SourceListComponent } from './source-list/source-list.component';
import { AddSourceComponent } from './add-source/add-source.component';
import { EditSourceComponent } from './edit-source/edit-source.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ChannelSourceComponent,
    SourceListComponent,
    AddSourceComponent,
    EditSourceComponent
  ],
  imports: [
    CommonModule,
    ChannelSourceRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class ChannelSourceModule { }
