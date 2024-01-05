import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectorRef
} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { ApiService } from 'src/app/service/API/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  hideEditLead:any;
  hideEditLeadBooleanValue!:boolean;
  advance_settings:any;
  advance_settingsbooleanValue!:boolean;
  id:any;
constructor(private api:ApiService,private route:ActivatedRoute){
  this.id=localStorage.getItem('user_id')
 this.hideEditLead=localStorage.getItem('edit_lead');
 this.hideEditLeadBooleanValue=JSON.parse(this.hideEditLead);
 console.log(typeof this.hideEditLeadBooleanValue,"bv")
 this.advance_settings=localStorage.getItem('adv_comm_sett');
 this.advance_settingsbooleanValue=JSON.parse(this.advance_settings);
 console.log(this.advance_settingsbooleanValue,"advance setting")

}

ngOnInit() {
  this.getPermissions();
 
}
advanceComSet!:boolean;
permissions:any=[];

getPermissions(){
  this.api.getAdvanceSettingsPermissions(this.id).subscribe((res:any)=>{
this.permissions=res;
console.log(this.permissions,'permissions')
this.advanceComSet=res.results[0].adv_sett[0].adv_comm_sett
console.log( typeof this.advanceComSet,"this.advanceComSet")
  })
}




  fillerNav =[ 
    {
    page:'Analytics',
    path:'/analytics',
    icon:'bi bi-graph-up-arrow',
    hidden:false
   
    },
    {
    page:'Upcoming Tasks',
    path:'/upcomingTasks',
    icon:'bi bi-columns-gap',
    hidden:false
   
    },
    {
    page:'Raw Data',
    path:'/rawData',
    icon:'bi bi-database-fill',
    hidden:false
   
    },
    
    {
    page:'Lead List',
    path:'/leadList',
    icon:'bi bi-1-square',
    hidden:true,
    },
    
    {
    page:'Transaction Details',
    path:'/transaction',
    icon:'bi bi-1-square',
    hidden:false
    },
    {
    page:'Application List',
    path:'/applicationList',
    icon:'bi bi-file-earmark-ruled-fill',
    hidden:false
    },
    {
    page:'Chat List',
    path:'/chatList',
    icon:'bi bi-wechat',
    hidden:false
    },
    {
    page:'My Followups',
    path:'/myFollowups',
    icon:'bi bi-calendar2-week',
    hidden:false
    },
    {
    page:'Failed Leads',
    path:'/failedLeads',
    icon:'bi bi-person-fill-x',
    hidden:false
    },
    {
    page:'Bulk Actions',
    path:'/bulkActions',
    icon:'bi bi-check-square-fill',
    hidden:false
    },
    {
    page:'WhatsApp Chat',
    path:'/whatsAppChat',
    icon:'bi bi-whatsapp',
    hidden:false
    },
    {
    page:'Marketing Campaign',
    path:'/marketingCampaign',
    icon:'bi bi-megaphone-fill',

    hidden:false
    },
    {
    page:'Rule Engine',
    path:'/ruleEngine',
    icon:'bi bi-cpu-fill',
    hidden:false
    },
    {
    page:'Remarketing',
    path:'/remarketing',
    icon:'bi bi-dpad-fill',
    hidden:false
    },
    {
    page:'Custom Reports',
    path:'/customReports',
    icon:'bi bi-clipboard2-data',
    hidden:false
    },
    {
    page:'Connected Accounts',
    path:'/connectedAccounts',
    icon:'bi bi-person-fill-gear',
    hidden:false
    },
    {
    page:'Settings',
    path:'/settings',
    icon:'bi bi-gear-wide',
    hidden:false
    },
    {
    page:'Advance Settings',
    path:'/advancesettings',
    icon:'bi bi-gear-wide-connected',
    hidden:true,
    key:'adv_comm_sett'
    },
    {
      page:'Report',
      path:'report',
      icon:'bi bi-graph-up-arrow',
      hidden:false
    }
    ]
    
    mobileQuery: any;
    notification: boolean = false;
   

  


}
