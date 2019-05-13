import React from 'react'

import ScrollerHoc from '../scroller/scroller'
import query from '../../queries/feed'
import Threads from '../threads/threads'

const variables = {
  privacy: 'PRIVATE'
}

function PrivateFeed ({ getScrollParent }) {
  const Scroller = ScrollerHoc(Threads, 'threads')

  return (
    <Scroller query={query} variables={variables} getScrollParent={getScrollParent} />
  )
}

export default PrivateFeed
