import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ShoeItem } from '../ShoeItem';
import { map } from 'rxjs/operators';
import { BUY_SHOES_MUTATION } from '../queries/shoeQueries';

@Injectable({
  providedIn: 'root'
})
export class BuyShoeService {

  constructor(private apollo: Apollo) { }

  buyShoes(shoeIds: string[], datePurchasedShoe: Date): Observable<ShoeItem[]> {
      return this.apollo.mutate<{buyShoeItems: ShoeItem[]}>({
      mutation: BUY_SHOES_MUTATION,
      variables: {shoeIds, datePurchased: datePurchasedShoe}
    })
    .pipe(map(result => result.data.buyShoeItems));
  }
}
