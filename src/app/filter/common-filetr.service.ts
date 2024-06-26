import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonFiletrService {

  constructor() { }
  filters:any={
    'userProfileList':{
      role_id: [''],
      is_active: [''],
      designation: [''],
      reporting_to_ids: [''],

    }
  }
  getFilters(filterKey:string){
return this.filters[filterKey]
  }
  updateFilters(filterKey:string,newFilterValues:any){
this.filters[filterKey]=newFilterValues
  }
}
