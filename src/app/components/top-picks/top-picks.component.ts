import {Component, OnInit} from '@angular/core';
import {User} from '../../User';
import {map} from 'rxjs/operators';
import {ShoeItem} from '../../ShoeItem';
import {Brand} from '../../enums/Brand';
import {sortBy} from "lodash";
import {TopPicksService} from 'src/app/services/top-picks.service';
import {ShoeItemRepository} from "../../storeData/shoesStore/shoeItemStore.store";

@Component({
  selector: 'app-top-picks',
  templateUrl: './top-picks.component.html',
  styleUrls: ['./top-picks.component.less']
})
export class TopPicksComponent implements OnInit {

  loginUser: User;
  topItems: ShoeItem[];

  constructor(private shoeItemRepository: ShoeItemRepository,
              private topPickService: TopPicksService) { }

  ngOnInit(): void {
   this.loginUser = this.getSignInUser();
   this.getTopItems();

  }

  getTopItems(): void {
    this.shoeItemRepository.shoes$.pipe(
    map((items) =>
      items.filter(item => this.loginUser.buyingHistory?.includes(item.id.toString()))))
      .subscribe(items => {
        this.topPickService.getTopPicksBrand(items).subscribe(mostPopularItem => {

          if (!mostPopularItem ) {
            mostPopularItem = Brand.ADIDAS;
          }

          let itemsToReturn:ShoeItem[] = [];
          this.shoeItemRepository.shoes$.pipe(map((items) => items.filter(item => item.basicShoe.brands.includes(mostPopularItem))))
          .subscribe(items => itemsToReturn = items);
          this.topItems = sortBy(itemsToReturn, shoe => shoe.basicShoe.rank).reverse().splice(0,4);
        })



      });
  }


  getSignInUser(): User {
    let user: User = JSON.parse(window.localStorage.getItem("signInUser"));
    return user;
  }
}


