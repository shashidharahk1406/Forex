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
  //Status
}
