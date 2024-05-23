import { gql } from 'apollo-angular';

export const BUY_SHOES_MUTATION = gql`
        mutation buyShoeItems($shoeIds: [ID!]!, $datePurchased: Date!) {
          buyShoeItems(shoeIds: $shoeIds, datePurchased: $datePurchased) {
            datePurchased
            dateCreated
            size
            userRating
            id
            basicShoe {
              rank
              id
              numberOfRates
              price
              model
              brands
            }
          }
    }`;

export const RATE_SHOE = gql`
    mutation rateShoe($shoeId: ID!,$basicShoeId: ID! $rating: Float!) {
        rateShoeItem(shoeId: $shoeId,basicShoeId: $basicShoeId rating: $rating) {
        datePurchased
        dateCreated
        size
        id
        userRating
        basicShoe {
            rank
            id
            numberOfRates
            price
            model
            brands
        }
    }
}`;

export const GET_BASICSHOES = gql`
    query getAllBasicShoe {
        getAllBasicShoe {
          rank
          id
          numberOfRates
          price
          model
          brands
          }
        }`;

export const CREATE_SHOE = gql`
        mutation createShoeItem($shoeItem: InputShoeItem!) {
          createShoeItem(shoeItem: $shoeItem) {
            datePurchased
            dateCreated
            userRating
            size
            id
            basicShoe {
              rank
              id
              numberOfRates
              price
              model
              brands
            }
          }
    }`;

export const GET_MOST_POPULAR_BRAND = gql`
  query getMostPopularBrand($buyingHistoryItems: [InputShoeItemWithAllParam]) {
    getMostPopularBrand(buyingHistoryItems: $buyingHistoryItems)
  }`;

export const SHOES_QUERY = gql`
    query getAllShoeItems {
          getAllShoeItems {
              id
              size
              dateCreated
              datePurchased
              userRating
              basicShoe {
                  id
                  brands
                  model
                  price
                  rank
                  numberOfRates
              }
      }
    }`;
