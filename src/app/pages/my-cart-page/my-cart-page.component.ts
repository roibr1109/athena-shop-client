import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';
import {ShoeItem} from '../../ShoeItem';
import {User} from '../../User';
import {BuyShoeService} from 'src/app/services/buy-shoe.service';
import {UserUpdateService} from 'src/app/services/user-update.service';
import {CartRepository} from '../../storeData/cartStore/cart.store';
import {ShoeItemRepository} from '../../storeData/shoesStore/shoeItemStore.store';

@Component({
  selector: 'app-my-cart-page',
  templateUrl: './my-cart-page.component.html',
  styleUrls: ['./my-cart-page.component.less']
})
export class MyCartPageComponent implements OnInit {
  itemForSale: ShoeItem[];
  totalPriceOfShoes = 0;
  deliveryCost: number;
  loading = false;

  constructor(
    private router: Router,
    private cart: CartRepository,
    private shoeItemStore: ShoeItemRepository,
    private notification: NotificationsService,
    private buyShoeService: BuyShoeService,
    private updateUserService: UserUpdateService) {
  }

  ngOnInit(): void {
    this.deliveryCost = 10;
    this.getItemsForSale();
    this.calculate();
  }

  calculate(): void {
    this.totalPriceOfShoes = 0;

    this.itemForSale.forEach(item => {
      this.totalPriceOfShoes += item.basicShoe.price;
    });
  }

  getItemsForSale(): void {
    this.cart.cartShoes$.subscribe(shoes => {
      this.itemForSale = shoes;
      this.calculate();
    });
  }

  checkout(): void {
    if (!this.loading) {
      const itemsCheck = this.itemForSale.filter(item => item.datePurchased !== null);
      this.loading = true;
      if (itemsCheck.length !== 0) {
        setTimeout(() => {
          this.loading = false;
          itemsCheck.forEach(item => this.notification.error('Failed to purchase', item.basicShoe.model + ' has been sold out', {
            timeOut: 2000,
            showProgressBar: true,
            pauseOnHover: true,
          }));
        }, 2000);
      } else if (this.itemForSale.length) {
        const shoeIds = this.itemForSale.map(({id}) => id);

        this.loading = false;
        const user: User = JSON.parse(window.localStorage.getItem('signInUser'));


        this.buyShoeService.buyShoes(shoeIds, new Date()).subscribe(shoesFromServer => {
          this.shoeItemStore.upsertItem(shoesFromServer);

          if (user.buyingHistory) {
            user.buyingHistory = user.buyingHistory.concat(shoeIds);
          } else {
            user.buyingHistory = shoeIds;
          }
          this.cart.remove(shoeIds);
          this.updateUserService.updateUser(user.id, user.buyingHistory).subscribe(updatedUser => {
            localStorage.setItem('signInUser', JSON.stringify(user));

            this.notification.success('Purchased!', 'the purchased succesfuly completed', {
              timeOut: 2000,
              showProgressBar: true,
              pauseOnHover: true,
            });

            setTimeout(() => {
              this.router.navigateByUrl('history-page');
            }, 2000);
          });

        });
      }
    } else {
      this.loading = false;
      this.notification.info('', 'you didn\'t purchased nothing', {
        timeOut: 2000,
        showProgressBar: true,
        pauseOnHover: true,
      });
    }
  }
}



