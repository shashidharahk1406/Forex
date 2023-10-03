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
  //New Channel
  getNewChannel(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/new-channel?page_size=${size}&page=${pageNo}`)
  }
  getAllNewChannel(){
    return this.http.get(`${this.baseurl}/api/new-channel`)
  }
  getNewChannelById(id:any){
    return this.http.get(`${this.baseurl}/api/new-channel/${id}/`)
  }
  editNewChannel(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/new-channel/${id}/`,data)
  }
  postNewChannel(data:any){
    return this.http.post(`${this.baseurl}/api/new-channel/`,data)
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
  //Medium
  //Level of program
  getLevelOfProgram(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/level-of-program?page_size=${size}&page=${pageNo}`)
  }
  getAllLevelOfProgram(){
    return this.http.get(`${this.baseurl}/api/level-of-program`)
  }
  getLevelOfProgramById(id:any){
    return this.http.get(`${this.baseurl}/api/level-of-program/${id}/`)
  }
  editLevelOfProgram(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/level-of-program/${id}/`,data)
  }
  postLevelOfProgram(data:any){
    return this.http.post(`${this.baseurl}/api/level-of-program/`,data)
  }
  //Level of program
  //Department
  getDepartment(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/department?page_size=${size}&page=${pageNo}`)
  }
  getAllDepartment(){
    return this.http.get(`${this.baseurl}/api/department`)
  }
  getDepartmentById(id:any){
    return this.http.get(`${this.baseurl}/api/department/${id}/`)
  }
  editDepartment(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/department/${id}/`,data)
  }
  postDepartment(data:any){
    return this.http.post(`${this.baseurl}/api/department/`,data)
  }
  //Department
  //Course
  getCourse(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/course?page_size=${size}&page=${pageNo}`)
  }
  getAllCourse(){
    return this.http.get(`${this.baseurl}/api/course`)
  }
  getCourseById(id:any){
    return this.http.get(`${this.baseurl}/api/course/${id}/`)
  }
  editCourse(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/course/${id}/`,data)
  }
  postCourse(data:any){
    return this.http.post(`${this.baseurl}/api/course/`,data)
  }
  //Course
  //Country
  getCountry(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/country?page_size=${size}&page=${pageNo}`)
  }
  getAllCountry(){
    return this.http.get(`${this.baseurl}/api/country`)
  }
  getCountryById(id:any){
    return this.http.get(`${this.baseurl}/api/country/${id}/`)
  }
  editCountry(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/country/${id}/`,data)
  }
  postCountry(data:any){
    return this.http.post(`${this.baseurl}/api/country/`,data)
  }
  //Country
  //State
  getState(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/state?page_size=${size}&page=${pageNo}`)
  }
  getAllState(){
    return this.http.get(`${this.baseurl}/api/state`)
  }
  getStateById(id:any){
    return this.http.get(`${this.baseurl}/api/state/${id}/`)
  }
  editState(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/state/${id}/`,data)
  }
  postState(data:any){
    return this.http.post(`${this.baseurl}/api/state/`,data)
  }
  //State
  //City
  getCity(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/city?page_size=${size}&page=${pageNo}`)
  }
  getAllCity(){
    return this.http.get(`${this.baseurl}/api/city`)
  }
  getCityById(id:any){
    return this.http.get(`${this.baseurl}/api/city/${id}/`)
  }
  editCity(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/city/${id}/`,data)
  }
  postCity(data:any){
    return this.http.post(`${this.baseurl}/api/city/`,data)
  }
  //State
  //Priority
  getPriority(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/priority-name?page_size=${size}&page=${pageNo}`)
  }
  getAllPriority(){
    return this.http.get(`${this.baseurl}/api/priority-name`)
  }
  getPriorityById(id:any){
    return this.http.get(`${this.baseurl}/api/priority-name/${id}/`)
  }
  editPriority(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/priority-name/${id}/`,data)
  }
  postPriority(data:any){
    return this.http.post(`${this.baseurl}/api/priority-name/`,data)
  }
  //Priority
  //Priority Group
  getPriorityGroup(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/priority-group?page_size=${size}&page=${pageNo}`)
  }
  getAllPriorityGroup(){
    return this.http.get(`${this.baseurl}/api/priority-group`)
  }
  getPriorityGroupById(id:any){
    return this.http.get(`${this.baseurl}/api/priority-group/${id}/`)
  }
  editPriorityGroup(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/priority-group/${id}/`,data)
  }
  postPriorityGroup(data:any){
    return this.http.post(`${this.baseurl}/api/priority-group/`,data)
  }
  //Priority

  //Whatsapp Template
  getWhatsappTemplate(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/template?page_size=${size}&page=${pageNo}`)
  }
  getAllWhatsappTemplate(){
    return this.http.get(`${this.baseurl}/api/template`)
  }
  getWhatsappTemplateById(id:any){
    return this.http.get(`${this.baseurl}/api/template/${id}/`)
  }
  editWhatsappTemplate(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/template/${id}/`,data)
  }
  postWhatsappTemplate(data:any){
    return this.http.post(`${this.baseurl}/api/template/`,data)
  }
  //Whatsapp Template
}
