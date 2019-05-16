import gql from 'graphql-tag'

const query = gql`
  query(
    $first: Int,
    $last: Int,
    $before: String,
    $after: String,
    $query: String,
    $authors: [String!],
    $mentionsAuthors: [String!],
    ){
    posts(
      first: $first,
      last: $last,
      after: $after,
      before: $before,
      authors: $authors,
      mentionsAuthors: $mentionsAuthors,
      query: $query,
      ) {
      totalCount
    }
  }
`

export default query
