import { Component, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
export class DateFilterComponent implements OnInit {
  @ViewChild(DaterangepickerDirective, { static: false }) pickerDirective!: DaterangepickerDirective;
  keepCalendarOpeningWithRange:any;
  showRangeLabelOnInput:any;
  selected: any;
  alwaysShowCalendars!: boolean;
  enable: boolean = false;
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
  openDatepicker() {
    this.pickerDirective.open();
    this.enable = true
  }
 
  constructor() {
    this.alwaysShowCalendars = true;
  }
ngOnInit(): void {
  // Find the container where you want to append the new div
const container:any = document.querySelector('.md-drppicker');

// Create a new div element
const newDiv = document.createElement('div');
newDiv.classList.add('checkbox-container')

// Create and append four checkboxes with names
for (let i = 1; i <= 4; i++) {
  // Create a div for each checkbox-label pair
  const checkboxDiv = document.createElement('div');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = `checkbox${i}`;
  checkbox.id = `checkbox${i}`;
  checkbox.value = `Value ${i}`;
  
  // Add a class to the checkbox element
  checkboxDiv.classList.add('additional-checkbox');
  checkbox.classList.add('css-checkbox');
  const label = document.createElement('label');
  if (i === 1) {
    label.textContent = 'Creation Date';
  } else if (i === 2) {
    label.textContent = 'Modification Date';
  } else if (i === 3) {
    label.textContent = 'Next Action Date';
  } else if (i === 4) {
    label.textContent = 'Re Enquire Date';
  } 
  label.setAttribute('for', `checkbox${i}`);

  // Add an event listener to each checkbox
  checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
      //console.log(`Checkbox ${i} is checked. Value: ${checkbox.value}`);
    } else {
      //console.log(`Checkbox ${i} is unchecked.`);
    }
  });
// Add an event listener to each checkbox
checkbox.addEventListener('change', function() {
  if (checkbox.checked) {
    checkboxDiv.classList.add('checked-background');
    checkbox.classList.add('checkbox-clr')
    //console.log(`Checkbox ${i} is checked. Value: ${checkbox.value}`);
  } else {
    checkboxDiv.classList.remove('checked-background');
    checkbox.classList.remove('checkbox-clr')
    //console.log(`Checkbox ${i} is unchecked.`);
  }
});
  // Append the checkbox and label to the checkboxDiv
  checkboxDiv.appendChild(checkbox);
  checkboxDiv.appendChild(label);

  // Append the checkboxDiv to the newDiv
  newDiv.appendChild(checkboxDiv);
}

// Append the newDiv to the top of the container
container.insertBefore(newDiv, container.firstChild);

}




updateRange(rangeLabel: string) {
  // Handle the custom range logic here
  // For example, update the 'selected' date range based on the selected checkbox
}
}
