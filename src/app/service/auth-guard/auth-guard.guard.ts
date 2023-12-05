import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  public token:any;
  public verify:any;
  public currentUrl:any
  constructor(private router:Router) {

   }

   canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean|Observable<boolean>| Promise<boolean>
   {
    this.currentUrl = state.url;
    return this.checkUrl(this.currentUrl);
   }
   checkUrl(url:any):any{
    this.token = localStorage.getItem('token')
    if(!this.token ){
      this.router.navigate(['login'])
    }
    return true
   }

  
}
