import React from 'react'
import ScrollerHoc from '../scroller/scroller'
import query from '../../queries/feed'
import Threads from '../threads/threads'

const variables = {
  rootsAuthoredBySomeoneFollowedBy: '@U5GvOKP/YUza9k53DSXxT0mk3PIrnyAmessvNfZl5E0=.ed25519'
}

function BySomeoneYouFollowFeed ({ getScrollParent }) {
  const Scroller = ScrollerHoc(Threads, 'threads')
  return (
    <Scroller query={query} variables={variables} getScrollParent={getScrollParent} />
  )
}

export default BySomeoneYouFollowFeed
