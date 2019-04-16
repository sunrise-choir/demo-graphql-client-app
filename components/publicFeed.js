import React from 'react'
import ApolloClient from "apollo-boost"
import {Query} from "react-apollo"
import gql from "graphql-tag";

const query = gql`
  {
    threads(next: 4) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        root {
          id
          author {
            name
          }
        }
      }
    }
  }
`
