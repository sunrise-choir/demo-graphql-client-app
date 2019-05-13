import gql from 'graphql-tag'

const query = gql`
  query(
    $first: Int,
    $after: String,
    $rootsAuthoredBy: [String!],
    $rootsAuthoredBySomeoneFollowedBy: [String!],
    $hasRepliesAuthoredBy: [String!],
    $hasRepliesAuthoredBySomeoneFollowedBy: [String!],
    $mentionsAuthors: [String!],
    $privacy: Privacy
    ){

    threads(
      first: $first,
      after: $after,
      rootsAuthoredBy: $rootsAuthoredBy,
      rootsAuthoredBySomeoneFollowedBy: $rootsAuthoredBySomeoneFollowedBy,
      hasRepliesAuthoredBy: $hasRepliesAuthoredBy,
      hasRepliesAuthoredBySomeoneFollowedBy: $hasRepliesAuthoredBySomeoneFollowedBy,
      mentionsAuthors: $mentionsAuthors,
      privacy: $privacy
      ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          root {
            id
            text
            author {
              id
              name
              imageLink
            }
          }
          replies{
            id
            author{
              id
              name
              imageLink
            }
          }
        }
      }
    }
  }
`

export default query
