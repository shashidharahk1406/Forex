import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponCodesRoutingModule } from './coupon-codes-routing.module';
import { CouponCodesComponent } from './coupon-codes.component';
import { CouponCodesTableComponent } from './coupon-codes-table/coupon-codes-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';


@NgModule({
  declarations: [
    CouponCodesComponent,
    CouponCodesTableComponent
  ],
  imports: [
    CommonModule,
    CouponCodesRoutingModule,
    SharedModule,
    MaterialModule,
    MatBottomSheetModule
  ],
  exports:[
    CouponCodesComponent
  ]
})
export class CouponCodesModule { }
