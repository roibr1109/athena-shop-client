import { Injectable } from "@angular/core";
import { ShoeItem } from "../../ShoeItem";
import { createStore } from '@ngneat/elf';
import {selectAllEntities, setEntities, upsertEntities, withEntities} from '@ngneat/elf-entities';
import {SHOES_QUERY} from "../../queries/shoeQueries";
import {Apollo} from "apollo-angular";


const shoeItemStore = createStore({ name: 'shoeItemStore' }, withEntities<ShoeItem>());

@Injectable({
    providedIn: 'root'
})
export class ShoeItemRepository {
  constructor( private apollo: Apollo) {
  }

  shoes$ = shoeItemStore.pipe(selectAllEntities());

  loadShoes(): void {
    this.apollo.watchQuery<any>({
      query: SHOES_QUERY
    }).valueChanges.subscribe(result => shoeItemStore.update(setEntities(result.data.getAllShoeItems)))

  }

  upsertItem(items: ShoeItem[]): void {
    shoeItemStore.update(upsertEntities(items));
  }

}
