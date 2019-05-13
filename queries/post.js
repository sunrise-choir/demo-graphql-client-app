import gql from 'graphql-tag'

const query = gql`
  query(
    $first: Int,
    $after: String,
    $query: String,
    $authors: [String!],
    $mentionsAuthors: [String!],
    ){
    posts(
      first: $first,
      after: $after,
      authors: $authors,
      mentionsAuthors: $mentionsAuthors,
      query: $query,
      ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges{
        node {
          id
          text
          author {
            id
            name
            imageLink
          }
          rootKey
        }
      }
    }
  }
`

export default query
