import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsLayoutRoutingModule } from './settings-layout-routing.module';
import { SettingsLayoutComponent } from './settings-layout.component';
import { SettingsLayoutTabComponent } from './settings-layout-tab/settings-layout-tab.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { EmailTemplatesModule } from './email-templates/email-templates.module';
import { SmsTemplatesModule } from './sms-templates/sms-templates.module';
import { WhatsappTemplatesModule } from './whatsapp-templates/whatsapp-templates.module';
import { ShortcutMessagesModule } from './shortcut-messages/shortcut-messages.module';
import { AssignmentRuleModule } from './assignment-rule/assignment-rule.module';
import { SlotBookingModule } from './slot-booking/slot-booking.module';
import { CouponCodesModule } from './coupon-codes/coupon-codes.module';



@NgModule({
  declarations: [
    SettingsLayoutComponent,
    SettingsLayoutTabComponent,
  ],
  imports: [
    CommonModule,
    SettingsLayoutRoutingModule,
    SharedModule,
    MaterialModule,
    MatBottomSheetModule,
    EmailTemplatesModule,
    SmsTemplatesModule,
    WhatsappTemplatesModule,
    ShortcutMessagesModule,
    AssignmentRuleModule,
    SlotBookingModule,
    CouponCodesModule
  ],
  exports:[
    SettingsLayoutComponent
  ]
})
export class SettingsLayoutModule { }
