import React from 'react'
import ScrollerHoc from '../scroller/scroller'
import query from '../../queries/feed'
import Threads from '../threads/threads'

const variables = {
  hasRepliesAuthoredBy: '@U5GvOKP/YUza9k53DSXxT0mk3PIrnyAmessvNfZl5E0=.ed25519',
  rootsAuthoredBy: '@U5GvOKP/YUza9k53DSXxT0mk3PIrnyAmessvNfZl5E0=.ed25519'
}

function ParticipatingFeed ({ getScrollParent }) {
  const Scroller = ScrollerHoc(Threads, 'threads')
  return (
    <Scroller query={query} variables={variables} getScrollParent={getScrollParent} />
  )
}

export default ParticipatingFeed
