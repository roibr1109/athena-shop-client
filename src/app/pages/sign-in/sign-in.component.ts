import { Component } from '@angular/core';
import { SignInService } from '../../services/sign-in.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent {
  
  usernameInputed: string;
  loading: boolean = false;
  passwordInputed: string;

  constructor(private signInService: SignInService,
    private router: Router,
    private notification: NotificationsService) { }

  signIn(): void {
    this.loading =  true;
    this.signInService.signIn(this.usernameInputed,
    this.passwordInputed).subscribe((result) => {
      if (result.data.signIn) {
        window.localStorage.setItem("signInUser", JSON.stringify(result.data.signIn));
        
        setTimeout( () => { 
          this.loading = false;
          this.notification.success("Succes", this.usernameInputed + " sign in succesfully", {
            timeOut: 1000,
            showProgressBar: true,
            pauseOnHover: true,
          })  
        }, 1000);
        setTimeout( () => {
          this.router.navigateByUrl('main-page');  
        }, 3000);
      } else {
          setTimeout( () => { 
            this.loading = false;
            this.notification.error(result.errors[0].message, {
              timeOut: 1000,
              showProgressBar: true,
              pauseOnHover: true,
            })  
          }, 1000);
        }
    })
  }
    
  

  signUp(): void {
    this.signInService.signUp(this.usernameInputed, this.passwordInputed).subscribe(result => {
      window.localStorage.setItem("signInUser", JSON.stringify(result.data.createUser));
      this.router.navigateByUrl('main-page');
    })
   
  }

  signOut(): void {
    //save-in-server
    this.signInService.signOut();
  }
}
