import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { User } from '../User';
import { map } from 'rxjs/operators';
import { UPDATE_USER_MUTATION } from '../queries/userQueries';


@Injectable({
  providedIn: 'root'
})
export class UserUpdateService {

  constructor(private apollo: Apollo) { }

  updateUser(userId: string, newBuyingHistory: string[]): Observable<User> {
      return this.apollo.mutate<{userToUpdate: User}>({
      mutation: UPDATE_USER_MUTATION,
      variables: {userId, buyingHistory: newBuyingHistory}
    })
    .pipe(map(result => result.data.userToUpdate))
  }
}
