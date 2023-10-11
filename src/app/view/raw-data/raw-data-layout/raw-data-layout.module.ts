import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RawDataLayoutRoutingModule } from './raw-data-layout-routing.module';
import { RawDataLayoutComponent } from './raw-data-layout.component';
import { RawDataCardComponent } from './raw-data-card/raw-data-card.component';
import { MaterialModule } from 'src/app/material.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { SharedModule } from 'src/app/shared/shared.module';
import { RawDataCardContentComponent } from './raw-data-card-content/raw-data-card-content.component';
import { RawDataToolbarComponent } from './raw-data-toolbar/raw-data-toolbar.component';
import { RawDataBulkSortComponent } from './raw-data-bulk-sort/raw-data-bulk-sort.component';
import { RawDataBottomPanelComponent } from './raw-data-bottom-panel/raw-data-bottom-panel.component';
import { AddNewRawDataComponent } from './add-new-raw-data/add-new-raw-data.component';
import { AddPersonalDetailsComponent } from './add-personal-details/add-personal-details.component';
import { AddParentDetailsComponent } from './add-parent-details/add-parent-details.component';
import { AddGdpiDetailsComponent } from './add-gdpi-details/add-gdpi-details.component';
import { UploadRawLeadDataComponent } from './upload-raw-lead-data/upload-raw-lead-data.component';
import { RawDataVideoCallComponent } from './raw-data-video-call/raw-data-video-call.component';
import { RawDataCallComponent } from './raw-data-call/raw-data-call.component';
import { RawDataSmsComponent } from './raw-data-sms/raw-data-sms.component';
import { RawDataEmailComponent } from './raw-data-email/raw-data-email.component';
import { RawDataWhatsappchatComponent } from './raw-data-whatsappchat/raw-data-whatsappchat.component';
import { RawDataViewAllComponent } from './raw-data-view-all/raw-data-view-all.component';
import { RawDataCardMoreComponent } from './raw-data-card-more/raw-data-card-more.component';
import { RawDataEditComponent } from './raw-data-edit/raw-data-edit.component';
import { RawDataViewHistoryComponent } from './raw-data-view-history/raw-data-view-history.component';
import { RawDataFollowupComponent } from './raw-data-followup/raw-data-followup.component';
import { RawDataReferLeadComponent } from './raw-data-refer-lead/raw-data-refer-lead.component';
import { RawDataNoteComponent } from './raw-data-note/raw-data-note.component';


@NgModule({
  declarations: [
    RawDataLayoutComponent,
    RawDataCardComponent,
    RawDataCardContentComponent,
    RawDataToolbarComponent,
    RawDataBulkSortComponent,
    RawDataBottomPanelComponent,
    AddNewRawDataComponent,
    AddPersonalDetailsComponent,
    AddParentDetailsComponent,
    AddGdpiDetailsComponent,
    UploadRawLeadDataComponent,
    RawDataVideoCallComponent,
    RawDataCallComponent,
    RawDataSmsComponent,
    RawDataEmailComponent,
    RawDataWhatsappchatComponent,
    RawDataViewAllComponent,
    RawDataCardMoreComponent,
    RawDataEditComponent,
    RawDataViewHistoryComponent,
    RawDataFollowupComponent,
    RawDataReferLeadComponent,
    RawDataNoteComponent
  ],
  imports: [
    CommonModule,
    RawDataLayoutRoutingModule,
    MaterialModule,
    MatBottomSheetModule,
    SharedModule
  ],
  exports:[
    RawDataLayoutComponent
  ]
})
export class RawDataLayoutModule { }
