import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ShoeItemRepository} from "./storeData/shoesStore/shoeItemStore.store";
import {SignInService} from './services/sign-in.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  isSignIn = false;
  constructor(private shoeItemRepository: ShoeItemRepository,
    private router: Router, private signInService: SignInService) {
  }

  ngOnInit(): void {
    this.shoeItemRepository.loadShoes();
    this.isSignIn = this.signInService.isSignIn();
  }

  logOut(): void {
    window.localStorage.clear();
    this.router.navigateByUrl('sign-in');
  }
}
