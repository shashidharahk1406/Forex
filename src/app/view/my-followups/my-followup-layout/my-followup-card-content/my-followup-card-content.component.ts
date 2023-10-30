import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';

@Component({
  selector: 'app-my-followup-card-content',
  templateUrl: './my-followup-card-content.component.html',
  styleUrls: ['./my-followup-card-content.component.css']
})
export class MyFollowupCardContentComponent implements OnInit {
  selectedDate:any
  @ViewChild(DaterangepickerDirective, { static: false }) pickerDirective!: DaterangepickerDirective;
  @Input()leadData:any;
  expandPanel=false;
  morePanel: boolean = false;
  selected: any;
  alwaysShowCalendars!: boolean;
  keepCalendarOpeningWithRange:any;
  constructor(private _bottomSheet:  MatBottomSheet,private dialog: MatDialog) {
    this.alwaysShowCalendars = true;
  }
  
  ngOnInit(): void {
  }
  openMorePanel(){
    this.morePanel = !this.morePanel
  }
  
  openCall(name:string){
    // const dialogRef = this.dialog.open(RawDataCallComponent, {
    //   width:'30%',
    //   data: {name:name}
    // });
  
    // dialogRef.afterClosed().subscribe((result:any) => {
    //   console.log('The dialog was closed');
    // }); 
  }
  openSMS(name:any): void {
    // const config: MatBottomSheetConfig = {
    //   panelClass: 'lead-bottom-sheet',
    //   data: {name:name}
    // };
    // this._bottomSheet.open(RawDataSmsComponent,config);
  }
  openWhatsAppChat(){
    // const dialogRef = this.dialog.open(RawDataWhatsappchatComponent, {
    //   width:'45%',
    // });
  
    // dialogRef.afterClosed().subscribe((result:any) => {
    //   console.log('The dialog was closed');
    // });
  }
  openEmailChat(name:any){
    // const config: MatBottomSheetConfig = {
    //   panelClass: 'lead-bottom-sheet',
    //   data: {name:name}
    // };
    // this._bottomSheet.open(RawDataEmailComponent,config);
  }
  openVideoCall(){
    // const dialogRef = this.dialog.open(RawDataVideoCallComponent, {
    //   width:'45%',
    // });
  
    // dialogRef.afterClosed().subscribe((result:any) => {
    //   console.log('The dialog was closed');
    // });
  }
  openViewAll(name:any){
    // const dialogRef = this.dialog.open(RawDataViewAllComponent, {
    //   width:'60%',
    //   data: {name:name}
    // });
  
    // dialogRef.afterClosed().subscribe((result:any) => {
    //   console.log('The dialog was closed');
    // });
  }
  editLead(name:any){
    // const config: MatBottomSheetConfig = {
    //   panelClass: 'lead-bottom-sheet',
    //   data: {name:name}
    // };
    // this._bottomSheet.open(LeadEditComponent,config);
  }
  selectedDatePicker(event:any){
    console.log(event);
    this.selectedDate=event
  }
  }
  