import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectorRef
} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  fillerNav =[ 
    // {
    // page:'Analytics',
    // path:'/analytics',
    // icon:'bi bi-graph-up-arrow'
    // },
    // {
    // page:'Upcoming Tasks',
    // path:'/upcomingTasks',
    // icon:'bi bi-columns-gap'
    // },
    // {
    // page:'Raw Data',
    // path:'/rawData',
    // icon:'bi bi-database-fill'
    // },
    // {
    // page:'Lead List',
    // path:'/leadList',
    // icon:'bi bi-1-square'
    // },
    // {
    // page:'Application List',
    // path:'/applicationList',
    // icon:'bi bi-file-earmark-ruled-fill'
    // },
    // {
    // page:'Chat List',
    // path:'/chatList',
    // icon:'bi bi-wechat'
    // },
    // {
    // page:'My Followups',
    // path:'/myFollowups',
    // icon:'bi bi-calendar2-week'
    // },
    // {
    // page:'Failed Leads',
    // path:'/failedLeads',
    // icon:'bi bi-person-fill-x'
    // },
    // {
    // page:'Bulk Actions',
    // path:'/bulkActions',
    // icon:'bi bi-check-square-fill'
    // },
    // {
    // page:'WhatsApp Chat',
    // path:'/whatsAppChat',
    // icon:'bi bi-whatsapp'
    // },
    // {
    // page:'Marketing Campaign',
    // path:'/marketingCampaign',
    // icon:'bi bi-megaphone-fill'
    // },
    // {
    // page:'Rule Engine',
    // path:'/ruleEngine',
    // icon:'bi bi-cpu-fill'
    // },
    // {
    // page:'Remarketing',
    // path:'/remarketing',
    // icon:'bi bi-dpad-fill'
    // },
    // {
    // page:'Custom Reports',
    // path:'/customReports',
    // icon:'bi bi-clipboard2-data'
    // },
    // {
    // page:'Connected Accounts',
    // path:'/connectedAccounts',
    // icon:'bi bi-person-fill-gear'
    // },
    // {
    // page:'Settings',
    // path:'/settings',
    // icon:'bi bi-gear-wide'
    // },
    {
    page:'Advance Settings',
    path:'/advancesettings',
    icon:'bi bi-gear-wide-connected'
    },
    ]
    
    mobileQuery: any;
    _mobileQueryListener: () => void;
    notification: boolean = false;
    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
      this.mobileQuery = media.matchMedia('(max-width: 768px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

  ngOnInit() {
   
  }

  
}
