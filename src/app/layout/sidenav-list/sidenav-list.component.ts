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
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  leadList:any;
  hideEditLeadBooleanValue!:boolean;
  advance_settings:any=[];
  advance_settingsbooleanValue!:boolean;
  id:any;
  permissions:any;
  token:any
  decodedData:any;
  showHide!:boolean;
constructor(private api:ApiService,private route:ActivatedRoute){
  this.id=localStorage.getItem('user_id')
 
this.permissions=localStorage.getItem('resp')
// JSON.parse(this.permissions)
const decodedToken:any = jwtDecode(this.permissions);
//console.log(decodedToken,'decodedToken')
this.decodedData=decodedToken;


this.decodedData.permissions.forEach((element:any) => {
  this.fillerNav.forEach((menu:any)=>{
    if(element.menu_name===menu.page){
      menu.hidden=element.access_status;
     this.showHide=menu.hidden

    }
  })
  // this.advance_settings=element.access_status  
  //console.log(this.advance_settings,"this.advance_settings")
  // this.leadList=element.permissions[1].menu_name
  // //console.log(this.leadList,"this.leadList")
});
//console.log(this.fillerNav,"this.showHide")

}

ngOnInit() {

 
}






  fillerNav =[ 
    {
    page:'Analytics',
    path:'/analytics',
    icon:'bi bi-graph-up-arrow',
    hidden:true
   
    },
    {
    page:'Upcoming Tasks',
    path:'/upcomingTasks',
    icon:'bi bi-columns-gap',
    hidden:true
   
    },
    {
    page:'Raw Data',
    path:'/rawData',
    icon:'bi bi-database-fill',
    hidden:true
   
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
    hidden:true
    },
    {
    page:'Application List',
    path:'/applicationList',
    icon:'bi bi-file-earmark-ruled-fill',
    hidden:true
    },
    {
    page:'Chat List',
    path:'/chatList',
    icon:'bi bi-wechat',
    hidden:true
    },
    {
    page:'My Followups',
    path:'/myFollowups',
    icon:'bi bi-calendar2-week',
    hidden:true
    },
    {
    page:'Failed Leads',
    path:'/failedLeads',
    icon:'bi bi-person-fill-x',
    hidden:true
    },
    {
    page:'Bulk Actions',
    path:'/bulkActions',
    icon:'bi bi-check-square-fill',
    hidden:true
    },
    {
    page:'WhatsApp Chat',
    path:'/whatsAppChat',
    icon:'bi bi-whatsapp',
    hidden:true
    },
    {
    page:'Marketing Campaign',
    path:'/marketingCampaign',
    icon:'bi bi-megaphone-fill',

    hidden:true
    },
    {
    page:'Rule Engine',
    path:'/ruleEngine',
    icon:'bi bi-cpu-fill',
    hidden:true
    },
    {
    page:'Remarketing',
    path:'/remarketing',
    icon:'bi bi-dpad-fill',
    hidden:true
    },
    {
    page:'Custom Reports',
    path:'/customReports',
    icon:'bi bi-clipboard2-data',
    hidden:true
    },
    {
    page:'Connected Accounts',
    path:'/connectedAccounts',
    icon:'bi bi-person-fill-gear',
    hidden:true
    },
    ,
    {
    page:'Request Reports',
    path:'/request-report',
    icon:'bi bi-graph-up-arrow',
    hidden:true
    },
    {
    page:'Settings',
    path:'/settings',
    icon:'bi bi-gear-wide',
    hidden:true
    },
    {
    page:'Advance Settings',
    path:'/advancesettings',
    icon:'bi bi-gear-wide-connected',
    hidden:true,
    // key:'adv_comm_sett'
    },
    {
      page:'Report',
      path:'report',
      icon:'bi bi-graph-up-arrow',
      hidden:true
    }
    ]
    
    mobileQuery: any;
    notification: boolean = false;
   

  

  
}
