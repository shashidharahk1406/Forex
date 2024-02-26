import { Component, OnInit,Input } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationListCallComponent } from '../application-list-call/application-list-call.component';
import { ApplicationListSmsComponent } from '../application-list-sms/application-list-sms.component';
import { ApplicationListWhatsappComponent } from '../application-list-whatsapp/application-list-whatsapp.component';
import { ApplicationListEmailComponent } from '../application-list-email/application-list-email.component';
import { ApplicationListVideoCallComponent } from '../application-list-video-call/application-list-video-call.component';
import { ApplicationListViewAllComponent } from '../application-list-view-all/application-list-view-all.component';



@Component({
  selector: 'app-application-list-card-content',
  templateUrl: './application-list-card-content.component.html',
  styleUrls: ['./application-list-card-content.component.css']
})
export class ApplicationListCardContentComponent implements OnInit {
  @Input()leadData:any;
  expandPanel=false;
  morePanel: boolean = false;
  constructor(private _bottomSheet:  MatBottomSheet,private dialog: MatDialog) {}
  
  ngOnInit(): void {
  }
  openMorePanel(){
    this.morePanel = !this.morePanel
  }
  
  openCall(name:string){
    const dialogRef = this.dialog.open(ApplicationListCallComponent, {
      width:'30%',
      data: {name:name}
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    }); 
  }
  openSMS(name:any): void {
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      disableClose: true,
      data: {name:name}
    };
    this._bottomSheet.open(ApplicationListSmsComponent,config);
  }
  openWhatsAppChat(){
    const dialogRef = this.dialog.open(ApplicationListWhatsappComponent, {
      width:'45%',
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    });
  }
  openEmailChat(name:any){
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      data: {name:name},
      disableClose: true
    };
    this._bottomSheet.open(ApplicationListEmailComponent,config);
  }
  openVideoCall(){
    const dialogRef = this.dialog.open(ApplicationListVideoCallComponent, {
      width:'45%',
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    });
  }
  openViewAll(name:any){
    const dialogRef = this.dialog.open(ApplicationListViewAllComponent, {
      width:'60%',
      data: {name:name}
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    });
  }
  editLead(name:any){
    // const config: MatBottomSheetConfig = {
    //   panelClass: 'lead-bottom-sheet',
    //   data: {name:name}
    // };
    // this._bottomSheet.open(LeadEditComponent,config);
  }
  
  }
  