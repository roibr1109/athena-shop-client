import { Injectable } from '@angular/core';
import { User } from '../User';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { USER_QUERY, SIGN_UP_QUERY } from '../queries/userQueries';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private apollo: Apollo) { }

  signIn(usernameInputed: string, passwordInputed: string): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: USER_QUERY,
      errorPolicy: 'all',
      variables: {username: usernameInputed, password: passwordInputed}
    }).valueChanges
  }

  signUp(usernameInputed: string, passwordInputed: string): Observable<any> {

  return this.apollo.mutate<any>({
    mutation: SIGN_UP_QUERY,
    variables: {username: usernameInputed, password: passwordInputed}
  })
  .pipe(map((result) => result))
  }

  signOut(): void {
    window.localStorage.clear();
  }

  isSignIn(): boolean {
    return window.localStorage.getItem("signInUser") !== null;
  }
}
