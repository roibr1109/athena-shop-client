import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShoeItem } from '../../ShoeItem';
import {CartRepository} from "../../storeData/cartStore/cart.store";

@Component({
  selector: 'app-shoe-card',
  templateUrl: './shoe-card.component.html',
  styleUrls: ['./shoe-card.component.less']
})
export class ShoeCardComponent implements OnInit {

  @Input() onHistoryPage: boolean = false;
  @Input() shoeItem : ShoeItem;
  @Input() forSale: boolean = true;
  @Input() onNewItemPage: boolean = false;
  @Output() moveItemToSale = new EventEmitter<{item: ShoeItem, imgSrc: string}>();
  src: string = '';
  loading: boolean = false;

  constructor(private cart: CartRepository) {}

  ngOnInit(): void {
    this.src = this.getImgSrc()
  }

  getImgSrc(): string {
    let src = '../../../assets/items/';
    src += this.shoeItem.basicShoe.brands.join("_");
    src = src.toLowerCase();
    src.trim();
    src += '_' + this.shoeItem.basicShoe.model.split(" ").join("_");
    src += '.png';
    return src;
  }

  sell(item: ShoeItem): void {
    this.moveItemToSale.emit({item: item,imgSrc: this.getImgSrc()});
   }

   addItemToCart(item: ShoeItem): void {
     this.loading = true;

    setTimeout( () => {
      this.loading = false
      this.cart.add(item);
    }, 1000);

   }

   removeItemFromCart(): void {
     this.cart.remove(([this.shoeItem.id]));
   }

}


