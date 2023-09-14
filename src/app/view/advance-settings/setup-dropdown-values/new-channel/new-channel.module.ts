import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewChannelRoutingModule } from './new-channel-routing.module';
import { NewChannelComponent } from './new-channel.component';
import { NewChannelListComponent } from './new-channel-list/new-channel-list.component';
import { AddNewChannelComponent } from './add-new-channel/add-new-channel.component';
import { EditNewChannelComponent } from './edit-new-channel/edit-new-channel.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    NewChannelComponent,
    NewChannelListComponent,
    AddNewChannelComponent,
    EditNewChannelComponent
  ],
  imports: [
    CommonModule,
    NewChannelRoutingModule,
     SharedModule,
     MaterialModule
  ]
})
export class NewChannelModule { }
