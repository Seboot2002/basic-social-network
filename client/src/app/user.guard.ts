import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { identity, Observable } from 'rxjs';

import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor
  (
    private _router: Router,
    private _userService: UserService
  )
  {

  }

  //Decide si una ruta debe ser activada aprobando con true y denegando con false
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    {
      let identity = this._userService.getLocalIdentity();

      if(identity/* && (identity.role == 'user' || identity.role == 'admin')*/){
        return true;
      }
      else
      {
        this._router.navigate(['/login']);
        return false;
      }
  }
  
}
