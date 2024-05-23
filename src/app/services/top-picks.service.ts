import { Injectable } from '@angular/core';
import { ShoeItem } from '../ShoeItem';
import { Observable } from 'rxjs';
import { Brand } from '../enums/Brand';
import { gql, Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { GET_MOST_POPULAR_BRAND } from '../queries/shoeQueries';

@Injectable({
  providedIn: 'root'
})
export class TopPicksService {

  constructor(private apollo: Apollo) { }

  getTopPicksBrand(items: ShoeItem[]): Observable<Brand> {
      return this.apollo.query<any>({
      query: GET_MOST_POPULAR_BRAND, 
      variables: {buyingHistoryItems: items}
    })
    .pipe(map(result => result.data.getMostPopularBrand))
  }
  

}
