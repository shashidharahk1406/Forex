import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlotBookingRoutingModule } from './slot-booking-routing.module';
import { SlotBookingComponent } from './slot-booking.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { SlotBookingTableComponent } from './slot-booking-table/slot-booking-table.component';


@NgModule({
  declarations: [
    SlotBookingComponent,
    SlotBookingTableComponent
  ],
  imports: [
    CommonModule,
    SlotBookingRoutingModule,
    SharedModule,
    MaterialModule,
    MatBottomSheetModule
  ],
  exports:[
    SlotBookingComponent
  ]
})
export class SlotBookingModule { }
