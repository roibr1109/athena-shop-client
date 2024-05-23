import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ShoeItem } from '../ShoeItem';
import { map } from 'rxjs/operators';
import { RATE_SHOE } from '../queries/shoeQueries';

@Injectable({
  providedIn: 'root'
})
export class RateItemService {

  constructor(private apollo: Apollo) { }
  
  rateShoe(shoeId: string, basicShoeId: string, rating: number): Observable<ShoeItem> {
    

      return this.apollo.mutate<{rateShoeItem: ShoeItem}>({
      mutation: RATE_SHOE, 
      variables: {shoeId: shoeId,basicShoeId: basicShoeId,  rating: rating}
    })
    .pipe(map(result => result.data.rateShoeItem))
  }
}
