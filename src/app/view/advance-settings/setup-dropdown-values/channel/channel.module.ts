import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChannelRoutingModule } from './channel-routing.module';
import { ChannelComponent } from './channel.component';
import { ChannelListComponent } from './channel-list/channel-list.component';
import { AddChannelComponent } from './add-channel/add-channel.component';
import { EditChannelComponent } from './edit-channel/edit-channel.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    ChannelComponent,
    ChannelListComponent,
    AddChannelComponent,
    EditChannelComponent
  ],
  imports: [
    CommonModule,
    ChannelRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class ChannelModule { }
