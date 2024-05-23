import { Injectable } from '@angular/core';
import { ShoeItem } from './ShoeItem';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { InputShoeItem } from './InputShoeItem';
import { Observable } from 'rxjs/internal/Observable';
import { BasicShoe } from './BasicShoe';
import { GET_BASICSHOES, CREATE_SHOE } from './queries/shoeQueries';

@Injectable({
  providedIn: 'root'
})
export class NewItemsService {

  constructor(private apollo: Apollo) { }
  
  getItemsForcCreatingNewItem(): Observable<BasicShoe[]>{
    return this.apollo.query<any>({
      query: GET_BASICSHOES,
    }).pipe(map(result => result.data.getAllBasicShoe));
  }


  addNewItem(shoeItemToCreate: InputShoeItem): Observable<ShoeItem> {
    return this.apollo.mutate<{createShoeItem: ShoeItem}>({
      mutation: CREATE_SHOE, 
      variables: {shoeItem: shoeItemToCreate}
    })
    .pipe(map(result => result.data.createShoeItem))
  }
}
