import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class isAdminGuard implements CanActivate {
  canActivate() : boolean {
    return JSON.parse(window.localStorage.getItem("signInUser")).role === "admin";
  }

}
