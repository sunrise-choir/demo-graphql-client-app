import React from 'react'
import Feed from './feed'
import query from '../queries/feed'

const variables = {
  rootsAuthoredBySomeoneFollowedBy: '@U5GvOKP/YUza9k53DSXxT0mk3PIrnyAmessvNfZl5E0=.ed25519'
}

function BySomeoneYouFollowFeed ({ getScrollParent }) {
  return (
    <Feed query={query} variables={variables} getScrollParent={getScrollParent} />
  )
}

export default BySomeoneYouFollowFeed
