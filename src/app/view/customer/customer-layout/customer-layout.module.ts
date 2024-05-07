import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerLayoutComponent } from './customer-layout.component';
import { CustomerCardComponent } from './customer-card/customer-card.component';
import { CustomerCardContentComponent } from './customer-card-content/customer-card-content.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerEmailComponent } from './customer-email/customer-email.component';
import { CustomerFilterComponent } from './customer-filter/customer-filter.component';
import { CustomerFollowupComponent } from './customer-followup/customer-followup.component';
import { CustomerNoteComponent } from './customer-note/customer-note.component';
import { CustomerSmsComponent } from './customer-sms/customer-sms.component';
import { CustomerToolbarComponent } from './customer-toolbar/customer-toolbar.component';
import { CustomerVideoCallComponent } from './customer-video-call/customer-video-call.component';
import { CustomerWhatsappChatComponent } from './customer-whatsapp-chat/customer-whatsapp-chat.component';
import { CustomerCardMoreComponent } from './customer-card-more/customer-card-more.component';
import { CustomerPaymentDetailsComponent } from './customer-payment-details/customer-payment-details.component';
import { CustomerPaymentProofComponent } from './customer-payment-proof/customer-payment-proof.component';
import { CustomerPaymentStatusComponent } from './customer-payment-status/customer-payment-status.component';
import { CustomerReferLeadComponent } from './customer-refer-lead/customer-refer-lead.component';
import { CustomerAdmissionDetailsComponent } from './customer-admission-details/customer-admission-details.component';
import { CustomerDocProcessComponent } from './customer-doc-process/customer-doc-process.component';
import { CustomerEditDocProcessComponent } from './customer-edit-doc-process/customer-edit-doc-process.component';
import { CustomerBottomPannelComponent } from './customer-bottom-pannel/customer-bottom-pannel.component';
import { CustomerBulkSortComponent } from './customer-bulk-sort/customer-bulk-sort.component';
import { CustomerCallComponent } from './customer-call/customer-call.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MaterialModule } from 'src/app/material.module';
import { CustomerLayoutRoutingModule } from './customer-layout-routing.module';

@NgModule({
  declarations: [
    CustomerLayoutComponent,
    CustomerCardComponent,
    CustomerCardContentComponent,
    CustomerEditComponent,
    CustomerEmailComponent,
    CustomerFilterComponent,
    CustomerFollowupComponent,
    CustomerNoteComponent,
    CustomerSmsComponent,
    CustomerToolbarComponent,
    CustomerVideoCallComponent,
    CustomerWhatsappChatComponent,
    CustomerCardMoreComponent,
    CustomerPaymentDetailsComponent,
    CustomerPaymentProofComponent,
    CustomerPaymentStatusComponent,
    CustomerReferLeadComponent,
    CustomerAdmissionDetailsComponent,
    CustomerDocProcessComponent,
    CustomerEditDocProcessComponent,
    CustomerBottomPannelComponent,
    CustomerBulkSortComponent,
    CustomerCallComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatBottomSheetModule,
    SharedModule,
    CustomerLayoutRoutingModule,
  ],
  exports: [CustomerLayoutComponent, CustomerPaymentDetailsComponent],
})
export class CustomerLayoutModule {}
