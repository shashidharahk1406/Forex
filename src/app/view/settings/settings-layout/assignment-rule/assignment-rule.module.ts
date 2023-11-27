import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignmentRuleRoutingModule } from './assignment-rule-routing.module';
import { AssignmentRuleComponent } from './assignment-rule.component';
import { AssignmentRuleTableComponent } from './assignment-rule-table/assignment-rule-table.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { AddAssignmentRuleComponent } from './add-assignment-rule/add-assignment-rule.component';


@NgModule({
  declarations: [
    AssignmentRuleComponent,
    AssignmentRuleTableComponent,
    AddAssignmentRuleComponent
  ],
  imports: [
    CommonModule,
    AssignmentRuleRoutingModule,
    MaterialModule,
    SharedModule,
    MatBottomSheetModule
  ],
  exports:[
    AssignmentRuleComponent
  ]
})
export class AssignmentRuleModule { }
