import React, { useContext } from 'react'
import query from '../../queries/postCount'
import { CursorContext } from '../cursor/cursorProvider.js'
import { WhoAmIContext } from '../authors/whoAmIProvider.js'
import { Query } from 'react-apollo'

function MentionsNotification () {
  let cursorContext = useContext(CursorContext)
  cursorContext = cursorContext || {}

  const { cursor } = cursorContext

  let whoAmIContext = useContext(WhoAmIContext)
  whoAmIContext = whoAmIContext || {}

  const { whoAmI } = whoAmIContext

  const mergedVariables = {
    before: cursor,
    last: 10000,
    mentionsAuthors: [whoAmI]
  }
  return (
    <Query query={query} variables={mergedVariables} >
      {({ loading, error, data }) => {
        if (loading || error) return 'loading...'
        const { posts: { totalCount } } = data
        return totalCount > 0 ? `(${totalCount})` : ''
      }}
    </Query>
  )
}

export default MentionsNotification
