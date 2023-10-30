import { Injectable, OnInit } from '@angular/core';
import { ApiService } from './API/api.service';
import { environment } from 'src/environments/environment';
import { BaseServiceService } from './base-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  countryOptions: any = [];
  stateOptions: any = [];
  channels: any = [];
  sources: any = [];
  cityOptions: any = [];
  campaignOptions: any =[];
  newChannelOptions: any = [];
  departmentOptions: any;
  courseOptions: any;
  mediumOptions: any;
  priorities: any;
  status: any;
  subStatus: any;
  seasons: any;
  levelOfProgramOptions: any;

  constructor(private api:ApiService,private _baseService:BaseServiceService) {
    this.dropDownValues()
   }
  dropDownValues(){
    this.getCountry();
    this.getState();
    this.getChannel();
    this.getSource();
    this.getCity();
    this.getCampign();
    this.getNewChannel();
    this.getDepartment();
    this.getCourse();
    //this.getLocation();
    this.getMedium();
    this.getLevelOfProgram();
    this.getPriority();
    this.getStatus();
    this.getSubStatus();
    this.getSeason();
  }
  getCountry(): Observable<any>{
    return this.api.getAllCountry()
    
  }
  getState(){
    this.api.getAllState().subscribe((res:any)=>{
      if(res){
        this.stateOptions = res.results
        console.log(res)
      }
    },(error:any)=>{
      this.api.showError(error.error.message)
      
    })
    return this.stateOptions
  }
  getChannel(){
    this.api.getAllChannel().subscribe((resp:any)=>{
      if(resp.results){
        this.channels= resp.results;
      }
      else{
        this.api.showError('ERROR')
      }  
    },(error:any)=>{
      this.api.showError(error.error.message)
      
    }

    )
    return this.channels;
  }
  getSource(){
    this.api.getAllSource().subscribe((res:any)=>{
     if(res.results){
      this.sources = res.results
     }
     else{
      this.api.showError('ERROR')
     }
    },(error:any)=>{
      this.api.showError(error.error.message)
      
    })
    return this.sources;
  }
  getCity(){
    this.api.getAllCity().subscribe((res:any)=>{
      if(res.results){
        this.cityOptions = res.results;
      }
      else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
        this.api.showError(error.error.message)
        
      })
      return this.cityOptions
  }
  getCampign(){
    this.api.getAllCampign().subscribe((res:any)=>{
      if(res.results){
        this.campaignOptions = res.results;
      }
      else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
        this.api.showError(error.error.message)
        
      })
      return this.campaignOptions
  }
  getNewChannel(){
    this.api.getAllNewChannel().subscribe((res:any)=>{
      if(res.results){
        this.newChannelOptions = res.results;
      }
      else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
        this.api.showError(error.error.message)
        
      })
      return this.newChannelOptions
  }
  getDepartment(){
    this.api.getAllDepartment().subscribe((res:any)=>{
      if(res.results){
        this.departmentOptions = res.results;
      }
      else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
        this.api.showError(error.error.message)
        
      })
      return this.departmentOptions
  }
  getCourse(){
    this.api.getAllCourse().subscribe((res:any)=>{
      if(res.results){
        this.courseOptions = res.results;
      }
      else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
        this.api.showError(error.error.message)
        
      })
    return this.courseOptions;
  }
  getMedium(){
    this.api.getAllMedium().subscribe((res:any)=>{
      if(res.results){
        this.mediumOptions = res.results
      } else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
        this.api.showError(error.error.message)
    })
    return this.mediumOptions;
  }
  getLevelOfProgram(){
    this.api.getAllLevelOfProgram().subscribe((res:any)=>{
      if(res.results){
        this.levelOfProgramOptions = res.results 
      } else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
        this.api.showError(error.error.message)
    })
    return this.levelOfProgramOptions;
  }
  getPriority(){
    this._baseService.getData(environment.lead_priority).subscribe((res:any)=>{
        if(res.results){
          this.priorities = res.results
        } else{
          this.api.showError('ERROR')
         }
        },(error:any)=>{
          this.api.showError(error.error.message)
      })
      return this.priorities
  }
  getStatus(){
   this._baseService.getData(`${environment.lead_status}`).subscribe((res:any)=>{
    if(res.results){
      this.status = res.results;
    }
   },(error:any)=>{
    this.api.showError(error.error.message)
   })
   return this.status
  }
  getSubStatus(){
    this._baseService.getData(`${environment.lead_subStatus}`).subscribe((res:any)=>{
      if(res.results){
        this.subStatus = res.results;
      }
     },(error:any)=>{
      this.api.showError(error.error.message)
     })
     return this.subStatus
  }
  getSeason(){
    this._baseService.getData(environment.lead_season).subscribe((res:any)=>{
      if(res.results){
        this.seasons = res.results
      } else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
        this.api.showError(error.error.message)
    })
    return this.seasons;
  }
}
