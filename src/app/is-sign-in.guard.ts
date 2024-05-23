import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {SignInService} from './services/sign-in.service';

@Injectable({
  providedIn: 'root'
})
export class IsSignInGuard implements CanActivate {

  constructor(private signInService: SignInService) {
  }

  canActivate(): boolean {
    return this.signInService.isSignIn();
  }
}
