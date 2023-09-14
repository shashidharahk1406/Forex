import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryIdRoutingModule } from './country-id-routing.module';
import { CountryIdComponent } from './country-id.component';
import { CountryIdListComponent } from './country-id-list/country-id-list.component';
import { AddCountryComponent } from './add-country/add-country.component';
import { EditCountryIdComponent } from './edit-country-id/edit-country-id.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    CountryIdComponent,
    CountryIdListComponent,
    AddCountryComponent,
    EditCountryIdComponent
  ],
  imports: [
    CommonModule,
    CountryIdRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class CountryIdModule { }
