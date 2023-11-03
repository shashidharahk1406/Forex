import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationListLayoutRoutingModule } from './application-list-layout-routing.module';
import { ApplicationListLayoutComponent } from './application-list-layout.component';
import { ApplicationListCardComponent } from './application-list-card/application-list-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ApplicationListCardContentComponent } from './application-list-card-content/application-list-card-content.component';
import { ApplicationListToolBarComponent } from './application-list-tool-bar/application-list-tool-bar.component';
import { ApplicationBulkSortComponent } from './application-bulk-sort/application-bulk-sort.component';
import { ApplicationListBottomPanelComponent } from './application-list-bottom-panel/application-list-bottom-panel.component';
import { AddNewApplicationListComponent } from './add-new-application-list/add-new-application-list.component';
import { UploadApplicationListComponent } from './upload-application-list/upload-application-list.component';
import { ApplicationListCallComponent } from './application-list-call/application-list-call.component';
import { ApplicationListSmsComponent } from './application-list-sms/application-list-sms.component';
import { ApplicationListWhatsappComponent } from './application-list-whatsapp/application-list-whatsapp.component';
import { ApplicationListEmailComponent } from './application-list-email/application-list-email.component';
import { ApplicationListVideoCallComponent } from './application-list-video-call/application-list-video-call.component';
import { ApplicationListViewAllComponent } from './application-list-view-all/application-list-view-all.component';


@NgModule({
  declarations: [
    ApplicationListLayoutComponent,
    ApplicationListCardComponent,
    ApplicationListCardContentComponent,
    ApplicationListToolBarComponent,
    ApplicationBulkSortComponent,
    ApplicationListBottomPanelComponent,
    AddNewApplicationListComponent,
    UploadApplicationListComponent,
    ApplicationListCallComponent,
    ApplicationListSmsComponent,
    ApplicationListWhatsappComponent,
    ApplicationListEmailComponent,
    ApplicationListVideoCallComponent,
    ApplicationListViewAllComponent
  ],
  imports: [
    CommonModule,
    ApplicationListLayoutRoutingModule,
    SharedModule,
    MaterialModule,
    MatBottomSheetModule,
  ],
  exports:[
    ApplicationListLayoutComponent
  ]
})
export class ApplicationListLayoutModule { }
