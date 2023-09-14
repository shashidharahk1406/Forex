import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityRoutingModule } from './city-routing.module';
import { CityComponent } from './city.component';
import { CityListComponent } from './city-list/city-list.component';
import { AddCityComponent } from './add-city/add-city.component';
import { EditCityComponent } from './edit-city/edit-city.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    CityComponent,
    CityListComponent,
    AddCityComponent,
    EditCityComponent
  ],
  imports: [
    CommonModule,
    CityRoutingModule,
     SharedModule,
     MaterialModule
  ]
})
export class CityModule { }
