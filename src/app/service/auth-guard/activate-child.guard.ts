import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { BaseServiceService } from '../base-service.service';
import { ApiService } from '../API/api.service';
import { EmitService } from '../emit/emit.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivateChildGuard implements CanActivateChild {
  userId:any;
  newDeviceToken: any;
  constructor(private _router: Router,  private baseService:BaseServiceService,
    private api:ApiService,
    private emit:EmitService) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isLoggedIn: boolean = localStorage.getItem('token') !== null;
    const user_id: any = localStorage.getItem('user_id');
    const device_token: any = localStorage.getItem('device_token');
    if (!isLoggedIn) {
      this._router.navigate(['/login']);
      return false;
      
    }else{
      this.baseService.getData(`${environment.device_token}${user_id}/`).subscribe((res:any):any=>{
        if(res.result[0].device_token){
          return true;
        }
      },(error:any)=>{
        if(error.error.status === 404){
        this.api.showError(error.error.message)
        this._router.navigate(['/login']);
        }
        return false;
      })
    }
   
    return true;
  }
  getRoleName():any{
    this.baseService.getData(environment._user)
        .subscribe(
          (resp: any) => {
            if(resp.results >0 ){
             
              this.userId = localStorage.getItem('user_id')
              resp.results.forEach((element:any) => {
                console.log(element)
              if(element.id == this.userId){
                 this.emit.userRole = element.role_name
                console.log(element)
              }
            });
          }
          },
          (error: any) => {
            this.api.showError(error.error.message);
          }
        );
   return true;
  }
}
