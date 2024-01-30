import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-lead-stages',
  templateUrl: './lead-stages.component.html',
  styleUrls: ['./lead-stages.component.css']
})

export class LeadStagesComponent implements OnInit {
  constructor(){}
  ngOnInit(): void {}
}
