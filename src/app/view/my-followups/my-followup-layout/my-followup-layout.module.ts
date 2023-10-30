import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyFollowupLayoutRoutingModule } from './my-followup-layout-routing.module';
import { MyFollowupLayoutComponent } from './my-followup-layout.component';
import { MyFollowupCardComponent } from './my-followup-card/my-followup-card.component';
import { MaterialModule } from 'src/app/material.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyFollowupCardContentComponent } from './my-followup-card-content/my-followup-card-content.component';
import { MyFollowupToolBarComponent } from './my-followup-tool-bar/my-followup-tool-bar.component';
import { MyFollowupSortComponent } from './my-followup-sort/my-followup-sort.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { MyFollowupBottomPannelComponent } from './my-followup-bottom-pannel/my-followup-bottom-pannel.component';


@NgModule({
  declarations: [
    MyFollowupLayoutComponent,
    MyFollowupCardComponent,
    MyFollowupCardContentComponent,
    MyFollowupToolBarComponent,
    MyFollowupSortComponent,
    MyFollowupBottomPannelComponent
  ],
  imports: [
    CommonModule,
    MyFollowupLayoutRoutingModule,
    MaterialModule,
    MatBottomSheetModule,
    SharedModule,
    NgxDaterangepickerMd.forRoot(),
  ],
  exports:[
    MyFollowupLayoutComponent
  ]
})
export class MyFollowupLayoutModule { }
