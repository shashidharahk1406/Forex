import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadLayoutRoutingModule } from './lead-layout-routing.module';
import { AddLeadComponent } from './add-lead/add-lead.component';
import { LeadLayoutComponent } from './lead-layout.component';
import { MaterialModule } from 'src/app/material.module';
import { MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { LeadCardComponent } from './lead-card/lead-card.component';
import { LeadCardContentComponent } from './lead-card-content/lead-card-content.component';
import { LeadToolbarComponent } from './lead-toolbar/lead-toolbar.component';
import { LeadBottomPannelComponent } from './lead-bottom-pannel/lead-bottom-pannel.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AddLeadComponent,
    LeadLayoutComponent,
    LeadCardComponent,
    LeadCardContentComponent,
    LeadToolbarComponent,
    LeadBottomPannelComponent
  ],
  imports: [
    CommonModule,
    LeadLayoutRoutingModule,
    MaterialModule,
    MatBottomSheetModule,
    SharedModule
  ],
  exports:[
    AddLeadComponent,
    LeadLayoutComponent
  ]
})
export class LeadLayoutModule { }
