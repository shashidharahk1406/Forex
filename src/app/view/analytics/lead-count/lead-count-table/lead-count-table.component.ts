import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { DownloadLeadListComponent } from '../download-lead-list/download-lead-list.component';
import { LeadCountSmsDownloadComponent } from '../lead-count-sms-download/lead-count-sms-download.component';
import { LeadCountMailComponent } from '../lead-count-mail/lead-count-mail.component';
import { LeadCountWhatsappComponent } from '../lead-count-whatsapp/lead-count-whatsapp.component';
import { Chart } from 'chart.js';
import { ApiService } from 'src/app/service/API/api.service';

export interface UserData {
  'User Name': string,
  'Email': string,
  'Mobile': string,
  'User Role': string,
  'Designation':string,

}
@Component({
  selector: 'app-lead-count-table',
  templateUrl: './lead-count-table.component.html',
  styleUrls: ['./lead-count-table.component.css']
})
export class LeadCountTableComponent implements  AfterViewInit {
  @ViewChild('myChart') private chartRef!: ElementRef;
  private chart!: Chart
  displayedColumns: string[] = [
    'User Name',
    'Email',
    'Mobile',
    'User Role',
   

  ]
  dataSource: MatTableDataSource<UserData>;
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  constructor(private dialog: MatDialog,  private api:ApiService
    ) {
      
   
      // Create 100 users
   let user:any = [{"User Name":"Ingamar","Email":"Thoughtmix","Mobile":"25-606-2835","User Role":"Staff Scientist","Designation":"Speech Pathologist","Reporting To":"Haggish","User Status":"Hopsage","Action":"Sapien.jpeg"},
    {"User Name":"Astrid","Email":"Cogilith","Mobile":"79-995-4674","User Role":"VP Sales","Designation":"Sales Associate","Reporting To":"Tourner","User Status":"Alkali Mallow","Action":"NonMattis.png"},
    {"User Name":"Field","Email":"Skyba","Mobile":"31-331-4507","User Role":"Staff Accountant II","Designation":"Speech Pathologist","Reporting To":"Brookson","User Status":"Hyacinth Meadow Garlic","Action":"SapienVariusUt.mpeg"},
    {"User Name":"Averill","Email":"Jayo","Mobile":"53-532-9001","User Role":"Staff Scientist","Designation":"Internal Auditor","Reporting To":"Magnus","User Status":"Great Laurel","Action":"LeoOdio.mp3"},
    {"User Name":"Marieann","Email":"Photojam","Mobile":"65-831-7474","User Role":"Tax Accountant","Designation":"Web Developer II","Reporting To":"Chiverstone","User Status":"Holywood","Action":"ImperdietSapienUrna.jpeg"},
    {"User Name":"Kitti","Email":"Zoombeat","Mobile":"01-143-5148","User Role":"Project Manager","Designation":"Administrative Assistant II","Reporting To":"McKinstry","User Status":"Yü-shan Raspberry","Action":"MassaId.tiff"},
    {"User Name":"Daryle","Email":"Flipbug","Mobile":"04-736-1501","User Role":"VP Marketing","Designation":"Clinical Specialist","Reporting To":"Deeny","User Status":"Chaffseed","Action":"OrciPede.mp3"},
    {"User Name":"Gabriello","Email":"Skinix","Mobile":"88-893-3201","User Role":"Database Administrator I","Designation":"Technical Writer","Reporting To":"Bordis","User Status":"Cottam's Buckwheat","Action":"Nam.ppt"},
    {"User Name":"Corabelle","Email":"Quinu","Mobile":"46-433-9297","User Role":"Account Executive","Designation":"Junior Executive","Reporting To":"Goalley","User Status":"Turbina","Action":"EratCurabitur.tiff"},
    {"User Name":"Jolyn","Email":"Gabcube","Mobile":"62-812-3254","User Role":"Electrical Engineer","Designation":"Project Manager","Reporting To":"Gauntlett","User Status":"Blue Mountain Buckwheat","Action":"Neque.mp3"},
    {"User Name":"Clare","Email":"Divavu","Mobile":"31-644-1717","User Role":"Help Desk Technician","Designation":"Web Developer III","Reporting To":"Hadye","User Status":"Pale Island Spleenwort","Action":"LaciniaAenean.tiff"},
    {"User Name":"Carilyn","Email":"Tagpad","Mobile":"09-445-1434","User Role":"Environmental Specialist","Designation":"Web Developer IV","Reporting To":"Tordiffe","User Status":"Bladdernut","Action":"LiberoQuis.pdf"},
    {"User Name":"Creight","Email":"Dabjam","Mobile":"16-415-1890","User Role":"Associate Professor","Designation":"Engineer II","Reporting To":"Tracy","User Status":"Soft Elephantsfoot","Action":"PhasellusIn.avi"},
    {"User Name":"Kathe","Email":"Gigashots","Mobile":"33-587-7725","User Role":"Dental Hygienist","Designation":"Recruiting Manager","Reporting To":"McIlwraith","User Status":"Tamarind Anisomeridium Lichen","Action":"RidiculusMusVivamus.ppt"},
    {"User Name":"Crysta","Email":"Twitternation","Mobile":"01-652-3421","User Role":"VP Sales","Designation":"Environmental Tech","Reporting To":"De La Haye","User Status":"Beard Lichen","Action":"Turpis.xls"},
    {"User Name":"Mariana","Email":"Zoovu","Mobile":"95-382-0899","User Role":"Administrative Officer","Designation":"Assistant Professor","Reporting To":"Fuidge","User Status":"Smoothleaf Beardtongue","Action":"SociisNatoquePenatibus.mp3"},
    {"User Name":"Paulie","Email":"Blogtag","Mobile":"16-753-9296","User Role":"Environmental Specialist","Designation":"VP Quality Control","Reporting To":"Dallemore","User Status":"Script Lichen","Action":"MaurisViverraDiam.pdf"},
    {"User Name":"Hector","Email":"Twitterworks","Mobile":"69-507-5809","User Role":"Environmental Specialist","Designation":"Structural Analysis Engineer","Reporting To":"Colaco","User Status":"Shy Gilia","Action":"Ac.avi"},
    {"User Name":"Willis","Email":"Photofeed","Mobile":"24-802-2280","User Role":"Office Assistant I","Designation":"Paralegal","Reporting To":"Kramer","User Status":"Silveus' Grass","Action":"Id.ppt"},
    {"User Name":"Merle","Email":"Midel","Mobile":"18-139-2381","User Role":"Design Engineer","Designation":"VP Accounting","Reporting To":"O'Cullen","User Status":"American Witchhazel","Action":"LobortisVelDapibus.avi"},
    {"User Name":"Haley","Email":"Edgeblab","Mobile":"18-292-4516","User Role":"Account Representative IV","Designation":"Engineer II","Reporting To":"Colbourn","User Status":"Elm","Action":"AnteNullaJusto.pdf"},
    {"User Name":"Manny","Email":"Youspan","Mobile":"38-423-6651","User Role":"Dental Hygienist","Designation":"Human Resources Manager","Reporting To":"Ghost","User Status":"Low Shoebutton","Action":"Dui.avi"},
    {"User Name":"Dietrich","Email":"Demivee","Mobile":"24-184-7761","User Role":"VP Accounting","Designation":"Design Engineer","Reporting To":"Ferie","User Status":"Larkspur","Action":"SapienIaculis.mov"},
    {"User Name":"Tiffie","Email":"Eamia","Mobile":"78-599-9849","User Role":"Internal Auditor","Designation":"Computer Systems Analyst III","Reporting To":"Rocca","User Status":"Elettaria","Action":"CubiliaCurae.avi"},
    {"User Name":"Leisha","Email":"Trupe","Mobile":"50-002-4936","User Role":"Senior Editor","Designation":"Tax Accountant","Reporting To":"Quaif","User Status":"Russian Thistle","Action":"Potenti.xls"},
    {"User Name":"Padraic","Email":"Mydo","Mobile":"22-121-4554","User Role":"Systems Administrator II","Designation":"Social Worker","Reporting To":"Mariaud","User Status":"Chaparral Asphead","Action":"InTemporTurpis.ppt"},
    {"User Name":"Nichol","Email":"Fadeo","Mobile":"24-355-1584","User Role":"Editor","Designation":"Assistant Manager","Reporting To":"Purdon","User Status":"Smallflower Sweetbrier","Action":"Ac.mp3"},
    {"User Name":"Chandal","Email":"Camimbo","Mobile":"59-675-9281","User Role":"Physical Therapy Assistant","Designation":"Assistant Media Planner","Reporting To":"Tothacot","User Status":"Bitter Gooseberry","Action":"Pulvinar.doc"},
    {"User Name":"Laverna","Email":"Roombo","Mobile":"48-212-1545","User Role":"Graphic Designer","Designation":"Mechanical Systems Engineer","Reporting To":"Aldersea","User Status":"Texan Sugarberry","Action":"EstLaciniaNisi.avi"},
    {"User Name":"Frans","Email":"Podcat","Mobile":"49-924-4985","User Role":"Librarian","Designation":"Biostatistician III","Reporting To":"Negro","User Status":"Suriana","Action":"Cras.ppt"},
    {"User Name":"Aldus","Email":"Yakitri","Mobile":"93-710-9162","User Role":"Operator","Designation":"Help Desk Technician","Reporting To":"Trudgeon","User Status":"Drummond's Yelloweyed Grass","Action":"NullaTempusVivamus.mov"},
    {"User Name":"Esmaria","Email":"Gigashots","Mobile":"24-057-5663","User Role":"Social Worker","Designation":"Computer Systems Analyst III","Reporting To":"Ingley","User Status":"Drug Fumitory","Action":"EtTempus.png"},
    {"User Name":"Zonda","Email":"Devshare","Mobile":"68-847-3383","User Role":"Tax Accountant","Designation":"Sales Representative","Reporting To":"Skyram","User Status":"Scalloped Laceleaf","Action":"At.jpeg"},
    {"User Name":"Melany","Email":"Trudoo","Mobile":"12-115-4702","User Role":"Environmental Specialist","Designation":"Structural Engineer","Reporting To":"Lettley","User Status":"Loa Milkvetch","Action":"Felis.avi"},
    {"User Name":"Farica","Email":"Jetwire","Mobile":"61-904-4714","User Role":"Director of Sales","Designation":"Research Associate","Reporting To":"Jeafferson","User Status":"Cup Lichen","Action":"SitAmet.ppt"},
    {"User Name":"Roger","Email":"Cogilith","Mobile":"40-584-4850","User Role":"Operator","Designation":"Software Consultant","Reporting To":"Medlin","User Status":"Pinepink","Action":"PotentiNullam.doc"},
    {"User Name":"Frieda","Email":"InnoZ","Mobile":"98-359-6954","User Role":"Clinical Specialist","Designation":"Software Test Engineer II","Reporting To":"Logan","User Status":"Douglas' Sedge","Action":"NibhIn.tiff"},
    {"User Name":"Nike","Email":"Voonder","Mobile":"50-279-1150","User Role":"Business Systems Development Analyst","Designation":"Office Assistant I","Reporting To":"Glauber","User Status":"Parry's Rabbitbrush","Action":"Morbi.tiff"},
    {"User Name":"Aridatha","Email":"Twimm","Mobile":"92-423-5949","User Role":"Senior Sales Associate","Designation":"Human Resources Assistant III","Reporting To":"Batterton","User Status":"Pacific Lovegrass","Action":"RisusDapibus.ppt"},
    {"User Name":"Matthaeus","Email":"Thoughtstorm","Mobile":"38-599-2165","User Role":"Food Chemist","Designation":"Biostatistician I","Reporting To":"Wingrove","User Status":"California Larkspur","Action":"Donec.avi"},
    {"User Name":"Rene","Email":"Eire","Mobile":"29-961-0085","User Role":"Business Systems Development Analyst","Designation":"Senior Cost Accountant","Reporting To":"Kingsman","User Status":"Corky Spindletree","Action":"Libero.xls"},
    {"User Name":"Julissa","Email":"Aivee","Mobile":"69-069-2705","User Role":"Software Test Engineer II","Designation":"Tax Accountant","Reporting To":"Cockram","User Status":"Stonecrop","Action":"Posuere.mp3"},
    {"User Name":"Neilla","Email":"Fliptune","Mobile":"04-467-2001","User Role":"Project Manager","Designation":"Speech Pathologist","Reporting To":"Toderini","User Status":"Plummer's Candyleaf","Action":"Eu.jpeg"},
    {"User Name":"Verna","Email":"Babblestorm","Mobile":"99-383-5524","User Role":"Environmental Tech","Designation":"Biostatistician II","Reporting To":"Ferryn","User Status":"Silkybent","Action":"EgetOrciVehicula.pdf"},
    {"User Name":"Estrella","Email":"Oyondu","Mobile":"38-825-6995","User Role":"Business Systems Development Analyst","Designation":"Legal Assistant","Reporting To":"D'Costa","User Status":"Mt. Tamalpais Jewelflower","Action":"AliquetMaecenas.xls"},
    {"User Name":"Lindy","Email":"Dazzlesphere","Mobile":"78-087-7442","User Role":"Chief Design Engineer","Designation":"GIS Technical Architect","Reporting To":"Dagless","User Status":"Saltmarsh False Foxglove","Action":"DuisConsequat.ppt"},
    {"User Name":"Chiquia","Email":"Youopia","Mobile":"90-588-7701","User Role":"Dental Hygienist","Designation":"Information Systems Manager","Reporting To":"Brownstein","User Status":"Northern Singlespike Sedge","Action":"EuTincidunt.tiff"},
    {"User Name":"Frankie","Email":"Leexo","Mobile":"92-710-2934","User Role":"Project Manager","Designation":"Director of Sales","Reporting To":"Breeds","User Status":"Hairy Wildrye","Action":"JustoNecCondimentum.tiff"},
    {"User Name":"Em","Email":"Mymm","Mobile":"77-440-2210","User Role":"Quality Control Specialist","Designation":"Software Engineer III","Reporting To":"Krysztofiak","User Status":"Dorr's Cabin Jewelflower","Action":"SedLacusMorbi.mp3"},
    {"User Name":"Field","Email":"Rhynyx","Mobile":"66-009-3567","User Role":"Quality Engineer","Designation":"Assistant Professor","Reporting To":"Tonsley","User Status":"Beebrush","Action":"Odio.png"},
    {"User Name":"Inigo","Email":"Voolith","Mobile":"75-971-7293","User Role":"VP Product Management","Designation":"Research Assistant IV","Reporting To":"Alday","User Status":"Lesser Fringed Gentian","Action":"ElementumInHac.jpeg"},
    {"User Name":"Heath","Email":"Topiclounge","Mobile":"24-240-8952","User Role":"Human Resources Manager","Designation":"Software Consultant","Reporting To":"Legerton","User Status":"Anisomeridium Lichen","Action":"AccumsanTellus.mp3"},
    {"User Name":"Harlie","Email":"Wikizz","Mobile":"22-417-5887","User Role":"Account Executive","Designation":"Associate Professor","Reporting To":"Hamnett","User Status":"Hand Bonnet Orchid","Action":"Maecenas.mp3"},
    {"User Name":"Deck","Email":"Jatri","Mobile":"40-135-9517","User Role":"Web Designer II","Designation":"Recruiter","Reporting To":"Cohrs","User Status":"Buckeye","Action":"IpsumIntegerA.mp3"},
    {"User Name":"Thom","Email":"Trilia","Mobile":"39-649-3593","User Role":"VP Quality Control","Designation":"Nuclear Power Engineer","Reporting To":"Peevor","User Status":"Silky Sophora","Action":"DonecQuisOrci.jpeg"},
    {"User Name":"Britt","Email":"Tagchat","Mobile":"68-558-8179","User Role":"Chief Design Engineer","Designation":"VP Sales","Reporting To":"Luca","User Status":"Molokai Treecotton","Action":"FusceConsequat.mp3"},
    {"User Name":"Emmalyn","Email":"Skyba","Mobile":"03-037-2739","User Role":"Software Test Engineer I","Designation":"Sales Representative","Reporting To":"Idale","User Status":"Neolaugeria","Action":"EuMagnaVulputate.mpeg"},
    {"User Name":"Aliza","Email":"Gigaclub","Mobile":"60-697-1587","User Role":"Research Assistant II","Designation":"Design Engineer","Reporting To":"Westell","User Status":"Curly Sedge","Action":"SodalesScelerisque.mp3"},
    {"User Name":"Tally","Email":"Fivespan","Mobile":"42-021-2170","User Role":"Sales Associate","Designation":"Assistant Manager","Reporting To":"Ebsworth","User Status":"Smooth Arizona Cypress","Action":"Sit.ppt"},
    {"User Name":"Yule","Email":"Aimbu","Mobile":"85-146-6762","User Role":"Nurse Practicioner","Designation":"Health Coach IV","Reporting To":"Slemming","User Status":"Smallflower Phyllostegia","Action":"InHac.avi"},
    {"User Name":"Nesta","Email":"Tagopia","Mobile":"37-167-7818","User Role":"Actuary","Designation":"Structural Engineer","Reporting To":"Elia","User Status":"Guizotia","Action":"ErosSuspendisseAccumsan.mp3"},
    {"User Name":"Chad","Email":"Npath","Mobile":"15-424-1496","User Role":"Project Manager","Designation":"GIS Technical Architect","Reporting To":"Dracey","User Status":"Lyre Shell Lichen","Action":"Amet.gif"},
    {"User Name":"Amalie","Email":"Trilia","Mobile":"53-839-8147","User Role":"Web Developer II","Designation":"VP Marketing","Reporting To":"Ovid","User Status":"False Gilyflower","Action":"MaecenasRhoncus.avi"},
    {"User Name":"Gregorio","Email":"Rhyloo","Mobile":"28-186-4920","User Role":"Mechanical Systems Engineer","Designation":"Senior Developer","Reporting To":"Wooder","User Status":"Gourka","Action":"NisiVolutpat.avi"},
    {"User Name":"Rice","Email":"Livetube","Mobile":"44-380-3934","User Role":"Technical Writer","Designation":"Environmental Specialist","Reporting To":"Izzett","User Status":"Smallflower Threadplant","Action":"NullaElitAc.jpeg"},
    {"User Name":"Tonnie","Email":"Skyvu","Mobile":"32-582-7927","User Role":"Librarian","Designation":"Desktop Support Technician","Reporting To":"Thaw","User Status":"Puerto Rico Mayten","Action":"Eget.png"},
    {"User Name":"Erskine","Email":"Twitterwire","Mobile":"83-382-1498","User Role":"VP Marketing","Designation":"Dental Hygienist","Reporting To":"Brooke","User Status":"Whitebristle Cottongrass","Action":"IdNulla.gif"},
    {"User Name":"Elmira","Email":"Twinte","Mobile":"59-093-4579","User Role":"Community Outreach Specialist","Designation":"Nurse","Reporting To":"Tatton","User Status":"Prairie Groundcherry","Action":"MattisOdioDonec.ppt"},
    {"User Name":"Ronni","Email":"Zava","Mobile":"26-807-1937","User Role":"Nurse Practicioner","Designation":"Registered Nurse","Reporting To":"Cranshaw","User Status":"Pauper Milkvetch","Action":"Semper.avi"},
    {"User Name":"Monty","Email":"Blogtag","Mobile":"07-857-6527","User Role":"Legal Assistant","Designation":"Marketing Manager","Reporting To":"Rumgay","User Status":"Elegant Jacob's-ladder","Action":"JustoInBlandit.tiff"},
    {"User Name":"Asa","Email":"Topicblab","Mobile":"99-057-2397","User Role":"Assistant Professor","Designation":"Senior Sales Associate","Reporting To":"Hustings","User Status":"Northern Dewberry","Action":"Ac.mp3"},
    {"User Name":"Clevie","Email":"Yadel","Mobile":"02-344-6142","User Role":"Compensation Analyst","Designation":"Desktop Support Technician","Reporting To":"Blakely","User Status":"Alabama Paraparmelia Lichen","Action":"Sapien.jpeg"},
    {"User Name":"Judie","Email":"Voonyx","Mobile":"63-757-6793","User Role":"Product Engineer","Designation":"Senior Financial Analyst","Reporting To":"Clemintoni","User Status":"Royal Goldfields","Action":"Mattis.png"},
    {"User Name":"Kathie","Email":"Meevee","Mobile":"81-221-0267","User Role":"Assistant Media Planner","Designation":"Software Engineer I","Reporting To":"Humbatch","User Status":"Jarilla","Action":"Turpis.mov"},
    {"User Name":"Kirby","Email":"Thoughtworks","Mobile":"03-147-5964","User Role":"Software Engineer I","Designation":"VP Marketing","Reporting To":"Daniellot","User Status":"Greater Yellowthroat Gilia","Action":"VenenatisTurpis.txt"},
    {"User Name":"Corrinne","Email":"Einti","Mobile":"94-525-7310","User Role":"Compensation Analyst","Designation":"Help Desk Operator","Reporting To":"Searston","User Status":"Columbiadoria","Action":"MaecenasTincidunt.ppt"},
    {"User Name":"Edita","Email":"Reallinks","Mobile":"34-065-9063","User Role":"Chemical Engineer","Designation":"Graphic Designer","Reporting To":"Audritt","User Status":"Padre's Shootingstar","Action":"NisiVenenatis.jpeg"},
    {"User Name":"Antone","Email":"Jetwire","Mobile":"09-345-1467","User Role":"Dental Hygienist","Designation":"Systems Administrator III","Reporting To":"Antonich","User Status":"Ward's Bladderpod","Action":"Venenatis.ppt"},
    {"User Name":"Jessa","Email":"Meedoo","Mobile":"24-438-5243","User Role":"Programmer IV","Designation":"VP Accounting","Reporting To":"Kinkead","User Status":"Pineland Scalypink","Action":"Nam.xls"},
    {"User Name":"Nicolai","Email":"Kwinu","Mobile":"80-752-0104","User Role":"Product Engineer","Designation":"Help Desk Technician","Reporting To":"Mariot","User Status":"Cuddy Mountain Onion","Action":"TinciduntIn.xls"},
    {"User Name":"Aveline","Email":"Jaxbean","Mobile":"82-697-3393","User Role":"Sales Associate","Designation":"Quality Engineer","Reporting To":"Airton","User Status":"Warnstorfia Moss","Action":"LuctusUltriciesEu.pdf"},
    {"User Name":"Florenza","Email":"Gabcube","Mobile":"04-621-6547","User Role":"Web Designer I","Designation":"Research Associate","Reporting To":"Quadri","User Status":"Curvepod Fumewort","Action":"In.avi"},
    {"User Name":"Valerye","Email":"Brainverse","Mobile":"35-152-9393","User Role":"Senior Sales Associate","Designation":"Research Nurse","Reporting To":"Ciccerale","User Status":"Creeping Waxweed","Action":"TristiqueEstEt.xls"},
    {"User Name":"Kiel","Email":"Trudoo","Mobile":"53-914-2114","User Role":"VP Product Management","Designation":"VP Accounting","Reporting To":"Jolly","User Status":"Spiked Western Rosinweed","Action":"AtNunc.avi"},
    {"User Name":"Corella","Email":"Eazzy","Mobile":"72-965-7044","User Role":"Geological Engineer","Designation":"GIS Technical Architect","Reporting To":"Dogerty","User Status":"Elliott's Fanpetals","Action":"Aliquet.ppt"},
    {"User Name":"Siouxie","Email":"Mydo","Mobile":"57-822-5669","User Role":"Quality Control Specialist","Designation":"Registered Nurse","Reporting To":"Kohrsen","User Status":"Cupeillo","Action":"Vulputate.ppt"},
    {"User Name":"Amos","Email":"Ailane","Mobile":"08-833-7193","User Role":"Software Engineer I","Designation":"Programmer II","Reporting To":"Nouch","User Status":"Purplerocket","Action":"ElementumNullamVarius.ppt"},
    {"User Name":"Morris","Email":"Twinder","Mobile":"11-275-1702","User Role":"Senior Sales Associate","Designation":"Research Nurse","Reporting To":"Geroldo","User Status":"Lompoc Yerba Santa","Action":"PenatibusEt.mp3"},
    {"User Name":"Alfie","Email":"Topiczoom","Mobile":"22-560-7296","User Role":"Geological Engineer","Designation":"Account Coordinator","Reporting To":"Fishbourn","User Status":"Pagosa Springs Bladderpod","Action":"CumSociisNatoque.tiff"},
    {"User Name":"Gustavo","Email":"Voonte","Mobile":"50-443-6263","User Role":"Analog Circuit Design manager","Designation":"Chemical Engineer","Reporting To":"Emblem","User Status":"Tall Baeckea","Action":"VelSemSed.tiff"},
    {"User Name":"Iormina","Email":"Zoovu","Mobile":"23-765-9577","User Role":"Programmer Analyst I","Designation":"Developer IV","Reporting To":"Eager","User Status":"Tall Annual Willowherb","Action":"QuamFringillaRhoncus.avi"},
    {"User Name":"Ricardo","Email":"Centidel","Mobile":"69-734-4604","User Role":"Quality Engineer","Designation":"Sales Representative","Reporting To":"Killgus","User Status":"Shortstem Buckwheat","Action":"FringillaRhoncusMauris.avi"},
    {"User Name":"Maighdiln","Email":"Kaymbo","Mobile":"44-746-4056","User Role":"Data Coordinator","Designation":"Media Manager I","Reporting To":"Megson","User Status":"Pasqueflower","Action":"VulputateUtUltrices.doc"},
    {"User Name":"Corrine","Email":"Quimm","Mobile":"08-434-5356","User Role":"Civil Engineer","Designation":"Marketing Assistant","Reporting To":"Pinnock","User Status":"Quill Beak Sedge","Action":"Suspendisse.jpeg"},
    {"User Name":"Antonia","Email":"Skyble","Mobile":"33-371-0174","User Role":"Legal Assistant","Designation":"Safety Technician I","Reporting To":"Peppett","User Status":"Nightshade","Action":"NequeDuisBibendum.mpeg"},
    {"User Name":"Kasey","Email":"Myworks","Mobile":"72-607-8186","User Role":"Programmer II","Designation":"Senior Sales Associate","Reporting To":"Berthomier","User Status":"Hyparrhenia","Action":"PurusEuMagna.jpeg"},
    {"User Name":"Faun","Email":"Browsetype","Mobile":"33-844-0439","User Role":"Geological Engineer","Designation":"Registered Nurse","Reporting To":"Lankford","User Status":"Callery Pear","Action":"LobortisSapien.ppt"},
    {"User Name":"Ramsey","Email":"Babblestorm","Mobile":"27-349-4344","User Role":"Software Consultant","Designation":"Systems Administrator III","Reporting To":"Vittle","User Status":"Boom's Quillwort","Action":"ConvallisDuisConsequat.tiff"},
    {"User Name":"Dulcine","Email":"Photospace","Mobile":"43-736-4099","User Role":"Developer IV","Designation":"VP Quality Control","Reporting To":"Heffer","User Status":"Smallflower False Foxglove","Action":"AugueVestibulum.mp3"},
    {"User Name":"Grannie","Email":"Meemm","Mobile":"67-823-8248","User Role":"Cost Accountant","Designation":"Account Representative III","Reporting To":"Epsley","User Status":"Swamp Cottonwood","Action":"PosuereMetusVitae.png"}]

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(user);

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.createChart()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  downloadLeadList(){
    const dialogRef = this.dialog.open(DownloadLeadListComponent, {
      width:'35%'
    });
    dialogRef.disableClose=true
  
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    }); 
  }
  openSMS(){
    const dialogRef = this.dialog.open(LeadCountSmsDownloadComponent, {
      width:'35%'
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    }); 
  }
  openEmail(){
    const dialogRef = this.dialog.open(LeadCountMailComponent, {
      width:'35%'
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    }); 
  }
  openWhatsapp(){
    const dialogRef = this.dialog.open(LeadCountWhatsappComponent, {
      width:'35%'
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    }); 
  }
  
  createChart() {
    this.api.getLeadCount().subscribe(
      (resp: any) => {
        if (this.chart) {
          this.chart.destroy();
        }
        this.chart = new Chart(this.chartRef.nativeElement, {
          type: 'bar',
          data: {
            labels: Object.keys(resp.result[0]), 
            datasets: [{
              label: '# of Leads',
              data: Object.values(resp.result[0]), 
              backgroundColor: [
                'red',
                'blue',
                'yellow',
                'green',
                'purple',
                'orange',
                'gray', 
              ],
              borderColor: [
                'red',
                'blue',
                'yellow',
                'green',
                'purple',
                'orange',
                'gray',
   
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      },
      (error: any) => {
        //console.log(error);
      }
    );
  }
  
  }

 
 


