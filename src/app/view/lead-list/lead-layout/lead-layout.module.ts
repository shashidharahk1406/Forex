import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadLayoutRoutingModule } from './lead-layout-routing.module';
import { AddLeadComponent } from './add-lead/add-lead.component';
import { LeadLayoutComponent } from './lead-layout.component';
import { MaterialModule } from 'src/app/material.module';
import { MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { LeadCardComponent } from './lead-card/lead-card.component';
import { LeadCardContentComponent } from './lead-card-content/lead-card-content.component';

@NgModule({
  declarations: [
    AddLeadComponent,
    LeadLayoutComponent,
    LeadCardComponent,
    LeadCardContentComponent
  ],
  imports: [
    CommonModule,
    LeadLayoutRoutingModule,
    MaterialModule,
    MatBottomSheetModule
  ],
  exports:[
    AddLeadComponent,
    LeadLayoutComponent
  ]
})
export class LeadLayoutModule { }
