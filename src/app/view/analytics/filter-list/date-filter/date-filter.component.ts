import { Component, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
export class DateFilterComponent implements OnInit {
  selected: any;
  alwaysShowCalendars!: boolean;
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];
  
  isInvalidDate = (m: moment.Moment) =>  {
    return this.invalidDates.some(d => d.isSame(m, 'day') )
  }
 
  isDropdownOpen: boolean = false; // Controls the visibility of the custom dropdown
  showModificationDate: boolean = false; // Checkbox state for Modification date
  showNextActionDate: boolean = false; // Checkbox state for Next action due date
  showReEnquireDate: boolean = false; // Checkbox state for Re-Enquire Date

  // ... (other properties and methods, like 'ranges' and 'isInvalidDate')

  // Function to toggle the visibility of the custom dropdown
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  constructor() {
    this.alwaysShowCalendars = true;
  }
ngOnInit(): void {
  
}
}
