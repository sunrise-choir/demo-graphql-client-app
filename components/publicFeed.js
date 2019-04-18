import React from 'react'

import Feed from './feed'
import query from '../queries/feed'

function PublicFeed ({ getScrollParent }) {
  return (
    <Feed query={query} getScrollParent={getScrollParent} />
  )
}

export default PublicFeed
