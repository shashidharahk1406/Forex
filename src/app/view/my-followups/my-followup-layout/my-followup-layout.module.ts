import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyFollowupLayoutRoutingModule } from './my-followup-layout-routing.module';
import { MyFollowupLayoutComponent } from './my-followup-layout.component';
import { MyFollowupCardComponent } from './my-followup-card/my-followup-card.component';
import { MaterialModule } from 'src/app/material.module';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyFollowupCardContentComponent } from './my-followup-card-content/my-followup-card-content.component';
import { MyFollowupToolBarComponent } from './my-followup-tool-bar/my-followup-tool-bar.component';
import { MyFollowupSortComponent } from './my-followup-sort/my-followup-sort.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { MyFollowupBottomPannelComponent } from './my-followup-bottom-pannel/my-followup-bottom-pannel.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReferFollowupComponent } from './refer-followup/refer-followup.component';
import { FollowupWhatsappchatComponent } from './followup-whatsappchat/followup-whatsappchat.component';
import { FollowupVideocallComponent } from './followup-videocall/followup-videocall.component';
import { FollowupEmailComponent } from './followup-email/followup-email.component';
import { FollowupSmsComponent } from './followup-sms/followup-sms.component';
import { FollowupNoteComponent } from './followup-note/followup-note.component';
// import { FullCalendarModule } from '@fullcalendar/angular';



@NgModule({
  declarations: [
    MyFollowupLayoutComponent,
    MyFollowupCardComponent,
    MyFollowupCardContentComponent,
    MyFollowupToolBarComponent,
    MyFollowupSortComponent,
    MyFollowupBottomPannelComponent,
    ReferFollowupComponent,
    FollowupWhatsappchatComponent,
    FollowupVideocallComponent,
    FollowupEmailComponent,
    FollowupSmsComponent,
    FollowupNoteComponent,
  ],
  imports: [
    CommonModule,
    MyFollowupLayoutRoutingModule,
    MaterialModule,
    MatBottomSheetModule,
    SharedModule,
    MatPaginatorModule,
    NgxDaterangepickerMd.forRoot(),
    MatTooltipModule,

    // FullCalendarModule,
  ],
  exports:[
    MyFollowupLayoutComponent
  ],
  providers: [
    { provide: MatBottomSheetRef, useValue: {} },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }
  ],
})
export class MyFollowupLayoutModule { }
