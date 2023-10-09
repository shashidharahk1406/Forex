import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { NgbCarouselModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from './notification/notification.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuickAddComponent } from './quick-add/quick-add.component';
import { LoginListComponent } from './login-list/login-list.component';
import { JsonPipe } from '@angular/common';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { GenericDeleteComponent } from './generic-delete/generic-delete.component';


@NgModule({
  declarations: [
    SearchbarComponent,
    NotificationComponent,
    QuickAddComponent,
    LoginListComponent,
    GenericDeleteComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgbCarouselModule,
    NgbTimepickerModule,
    JsonPipe
  ],
  exports:[
    SearchbarComponent,
    NotificationComponent,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    LoginListComponent,
    NgbTimepickerModule,
    JsonPipe
  ]
})
export class SharedModule { }
