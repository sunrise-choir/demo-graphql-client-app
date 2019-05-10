import React from 'react'

import ScrollerHoc from '../scroller/scroller'
import query from '../../queries/feed'
import Threads from '../threads/threads'

function PublicFeed ({ getScrollParent }) {
  const Scroller = ScrollerHoc(Threads, 'threads')

  return (
    <Scroller query={query} getScrollParent={getScrollParent} />
  )
}

export default PublicFeed
