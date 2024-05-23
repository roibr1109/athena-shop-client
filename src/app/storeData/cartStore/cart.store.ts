import { Injectable } from "@angular/core";
import { ShoeItem } from "../../ShoeItem";
import {deleteEntities, selectAllEntities, upsertEntities, withEntities} from "@ngneat/elf-entities";
import {createStore} from "@ngneat/elf";

const cartShoesStore = createStore({ name: 'cartShoesStore' }, withEntities<ShoeItem>());

@Injectable({
    providedIn: 'root'
})
export class CartRepository  {

  cartShoes$ = cartShoesStore.pipe(selectAllEntities());

  constructor() {
    }

  remove(ids: string[]): void {
    cartShoesStore.update(deleteEntities(ids));
  }

  add(shoe: ShoeItem): void {
    cartShoesStore.update(upsertEntities(shoe));
  }
}
