import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadLayoutRoutingModule } from './lead-layout-routing.module';
import { AddLeadComponent } from './add-lead/add-lead.component';
import { LeadLayoutComponent } from './lead-layout.component';
import { MaterialModule } from 'src/app/material.module';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

@NgModule({
  declarations: [
    AddLeadComponent,
    LeadLayoutComponent
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
