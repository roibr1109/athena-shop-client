import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {ShoeItem} from '../../ShoeItem';
import {User} from '../../User';
import {ShoeItemRepository} from "../../storeData/shoesStore/shoeItemStore.store";


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less']
})
export class HistoryComponent implements OnInit {

  purchasedItems: ShoeItem[] = [];

  constructor(private shoeItemRepository: ShoeItemRepository) {
  }

  ngOnInit(): void {
    this.getPurchasedItems();
  }

  getPurchasedItems(): void {
    const loginUser: User = JSON.parse(window.localStorage.getItem("signInUser"));

    this.shoeItemRepository.shoes$.pipe(map((items) => items.filter(item => loginUser.buyingHistory?.includes(item.id.toString()))))
      .subscribe(items => this.purchasedItems = items);
  }

}
