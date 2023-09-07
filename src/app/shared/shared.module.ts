import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from './notification/notification.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SearchbarComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    SearchbarComponent,
    NotificationComponent,
    NgbDropdownModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
