import gql from "graphql-tag";

const query = gql`
  query(
    $next: Int, 
    $after: String, 
    $rootsAuthoredBy: [String!], 
    $rootsAuthoredBySomeoneFollowedBy: [String!], 
    $hasRepliesAuthoredBy: [String!], 
    $hasRepliesAuthoredBySomeoneFollowedBy: [String!],
    ){

    threads(
      next: $next, 
      after: $after, 
      rootsAuthoredBy: $rootsAuthoredBy, 
      rootsAuthoredBySomeoneFollowedBy: $rootsAuthoredBySomeoneFollowedBy,
      hasRepliesAuthoredBy: $hasRepliesAuthoredBy,
      hasRepliesAuthoredBySomeoneFollowedBy: $hasRepliesAuthoredBySomeoneFollowedBy,
      ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        root {
          id
          text
          author {
            id
            name
            imageLink
          }
        }
      }
    }
  }
`

export default query
