import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFollowupsRoutingModule } from './my-followups-routing.module';
import { MyFollowupsComponent } from './my-followups.component';
import { MyFollowupLayoutModule } from './my-followup-layout/my-followup-layout.module';
// import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material/daterangepicker.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyFollowupFilterComponent } from './my-followup-filter/my-followup-filter.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import {MatCardModule} from '@angular/material/card';
import { MaterialModule } from 'src/app/material.module';
import { EditFollowupComponent } from './edit-followup/edit-followup.component';
import { CalenderModalComponent } from './calender-modal/calender-modal.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';




@NgModule({
  declarations: [
    MyFollowupsComponent,
    MyFollowupFilterComponent,
    EditFollowupComponent,
    CalenderModalComponent,
  ],
  imports: [
    CommonModule,
    MyFollowupsRoutingModule,
    MyFollowupLayoutModule,
    SharedModule,
    MatBottomSheetModule,
    MatCardModule,
    MaterialModule,
    Ng2SearchPipeModule
    
  ]
})
export class MyFollowupsModule { }
