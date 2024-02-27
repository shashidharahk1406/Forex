import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {
  file: boolean = false;
  constructor(private http:HttpClient){}
  getData(params:any){
    return this.http.get(params)
  }
  getByID(params:any){
    return this.http.get(params)
  }
  postData(url:any,data:any){
    return this.http.post(url, data);
  }
  postFile(url:any,data:any){
    this.file = true
    return this.http.post(url, data);
  }
  updateData(url:any,data:any){
    return this.http.put(url,data)
  }
  delete(id:any){
    return this.http.delete(id);
  }
}
