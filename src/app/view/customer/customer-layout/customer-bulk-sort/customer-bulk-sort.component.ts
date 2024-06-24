import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-customer-bulk-sort',
  templateUrl: './customer-bulk-sort.component.html',
  styleUrls: ['./customer-bulk-sort.component.css'],
})
export class CustomerBulkSortComponent implements OnInit {
  @Output() selectedSort: any = new EventEmitter();
  @ViewChild('dateType') dateType!: MatListModule;
  selected: boolean = false;
  constructor() {}
  typesOfDate: string[] = [
    'Ascending',
    'Descending',
    'Creation Date',
    'Modification Date',
  ];
  ngOnInit(): void {}

  onChange(event: any) {
    this.selected = true;
    this.selectedSort.emit(event);

    //console.log(this.dateType)
  }
}
