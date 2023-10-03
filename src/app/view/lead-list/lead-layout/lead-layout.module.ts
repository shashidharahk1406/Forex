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
import { SharedModule } from 'src/app/shared/shared.module';
import { LeadcardMoreComponent } from './leadcard-more/leadcard-more.component';
import { LeadBottomPannelComponent } from './lead-bottom-pannel/lead-bottom-pannel.component';
import { LeadSMSComponent } from './lead-sms/lead-sms.component';
import { LeadCallComponent } from './lead-call/lead-call.component';
import { LeadWhatsappChatComponent } from './lead-whatsapp-chat/lead-whatsapp-chat.component';
import { LeadEmailComponent } from './lead-email/lead-email.component';
import { LeadViewAllComponent } from './lead-view-all/lead-view-all.component';
import { LeadVideoCallComponent } from './lead-video-call/lead-video-call.component';

@NgModule({
  declarations: [
    AddLeadComponent,
    LeadLayoutComponent,
    LeadCardComponent,
    LeadCardContentComponent,
    LeadToolbarComponent,
    LeadBottomPannelComponent,
    LeadcardMoreComponent,
    LeadSMSComponent,
    LeadCallComponent,
    LeadWhatsappChatComponent,
    LeadEmailComponent,
    LeadViewAllComponent,
    LeadVideoCallComponent
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
