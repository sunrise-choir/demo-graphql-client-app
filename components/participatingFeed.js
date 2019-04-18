import React from 'react'
import Feed from './feed'
import query from '../queries/feed'

const variables = {
  hasRepliesAuthoredBy: '@U5GvOKP/YUza9k53DSXxT0mk3PIrnyAmessvNfZl5E0=.ed25519',
  rootsAuthoredBy: '@U5GvOKP/YUza9k53DSXxT0mk3PIrnyAmessvNfZl5E0=.ed25519'
}

function ParticipatingFeed ({ getScrollParent }) {
  return (
    <Feed query={query} variables={variables} getScrollParent={getScrollParent} />
  )
}

export default ParticipatingFeed
