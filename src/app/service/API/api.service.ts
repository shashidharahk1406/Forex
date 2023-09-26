import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseurl= environment.live_url;
  constructor(private http:HttpClient) { }

  
  //Gateway Api
  //Login
  login(data:any){
    return this.http.post(`${this.baseurl}/api/user-login/`,data)
  }
  //Login


  //Advanced Settings api
  //Setup dropupdown value
  //Status
  getStatus(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/status?page_size=${size}&page=${pageNo}`)
  }
  getStatusById(id:any){
    return this.http.get(`${this.baseurl}/api/status/${id}/`)
  }
  editStatus(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/status/${id}/`,data)
  }
  postStatus(data:any){
    return this.http.post(`${this.baseurl}/api/status/`,data)
  }
  //Status
  //Sub Status
  //Sub Status

  getSubStatus(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/sub-status?page_size=${size}&page=${pageNo}`)
  }
  getSubStatusById(id:any){
    return this.http.get(`${this.baseurl}/api/sub-status/${id}/`)
  }
  editSubStatus(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/sub-status/${id}/`,data)
  }
  postSubStatus(data:any){
    return this.http.post(`${this.baseurl}/api/sub-status/`,data)
  }
  //Master Status
  getAllMasterStatus(){
    return this.http.get(`${this.baseurl}/api/master-status`)
  }
  //Master Status
  // Status Group
  getAllStatusGroup(){
    return this.http.get(`${this.baseurl}/api/status-group`)
  }
  // Status Group
  // Status Group
  getAllReasonGroup(){
    return this.http.get(`${this.baseurl}/api/reason-group`)
  }
  // Status Group
  //Channel
  getChannel(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/channel?page_size=${size}&page=${pageNo}`)
  }
  getAllChannel(){
    return this.http.get(`${this.baseurl}/api/channel`)
  }
  getChannelById(id:any){
    return this.http.get(`${this.baseurl}/api/channel/${id}/`)
  }
  editChannel(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/channel/${id}/`,data)
  }
  postChannel(data:any){
    return this.http.post(`${this.baseurl}/api/channel/`,data)
  }
  //Channel
  //Source
  getSource(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/source?page_size=${size}&page=${pageNo}`)
  }
  getAllSource(){
    return this.http.get(`${this.baseurl}/api/source`)
  }
  getSourceById(id:any){
    return this.http.get(`${this.baseurl}/api/source/${id}/`)
  }
  editSource(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/source/${id}/`,data)
  }
  postSource(data:any){
    return this.http.post(`${this.baseurl}/api/source/`,data)
  }
  //Source
  //Campign
  getCampign(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/campaign?page_size=${size}&page=${pageNo}`)
  }
  getAllCampign(){
    return this.http.get(`${this.baseurl}/api/campaign`)
  }
  getCampignById(id:any){
    return this.http.get(`${this.baseurl}/api/campaign/${id}/`)
  }
  editCampign(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/campaign/${id}/`,data)
  }
  postCampign(data:any){
    return this.http.post(`${this.baseurl}/api/campaign/`,data)
  }
  //Campaign
  //Medium
  getMedium(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/medium?page_size=${size}&page=${pageNo}`)
  }
  getAllMedium(){
    return this.http.get(`${this.baseurl}/api/medium`)
  }
  getMediumById(id:any){
    return this.http.get(`${this.baseurl}/api/medium/${id}/`)
  }
  editMedium(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/medium/${id}/`,data)
  }
  postMedium(data:any){
    return this.http.post(`${this.baseurl}/api/medium/`,data)
  }
  //Campaign
}
