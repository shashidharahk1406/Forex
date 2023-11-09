import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { NgbCarouselModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from './notification/notification.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuickAddComponent } from './quick-add/quick-add.component';
import { LoginListComponent } from './login-list/login-list.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { GenericDeleteComponent } from './generic-delete/generic-delete.component';
import { NodataComponent } from './nodata/nodata.component';
import { GenericCountComponent } from './generic-count/generic-count.component';
import { FormSpaceDirective } from './form-space.directive';
import { ReadonlyTextareaDirective } from './non-editable.directive';

@NgModule({
  declarations: [
    SearchbarComponent,
    NotificationComponent,
    QuickAddComponent,
    LoginListComponent,
    GenericDeleteComponent,
    NodataComponent,
    GenericCountComponent,
    FormSpaceDirective,
    ReadonlyTextareaDirective
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgbCarouselModule,
    CKEditorModule ,
    NgbTimepickerModule,
    JsonPipe,
  ],
  exports:[
    SearchbarComponent,
    NotificationComponent,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    LoginListComponent,
    CKEditorModule ,
    NgbTimepickerModule,
    NodataComponent ,
    JsonPipe,
    FormSpaceDirective,
    ReadonlyTextareaDirective
  ]
})
export class SharedModule { }
