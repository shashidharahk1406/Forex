import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamComponent } from './stream.component';
import { StreamListComponent } from './stream-list/stream-list.component';
import { AddStreamComponent } from './add-stream/add-stream.component';
import { EditStreamComponent } from './edit-stream/edit-stream.component';
import { StreamRoutingModule } from './stream-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    StreamComponent,
    StreamListComponent,
    AddStreamComponent,
    EditStreamComponent
  ],
  imports: [
    CommonModule,
    StreamRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class StreamModule { }
