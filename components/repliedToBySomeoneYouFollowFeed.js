import React from 'react'

import Feed from './feed'
import query from '../queries/feed'

const variables = {
  hasRepliesAuthoredBySomeoneFollowedBy: '@U5GvOKP/YUza9k53DSXxT0mk3PIrnyAmessvNfZl5E0=.ed25519'
}

function RepliedToBySomeoneYouFollowFeed ({ getScrollParent }) {
  return (
    <Feed query={query} variables={variables} getScrollParent={getScrollParent} />
  )
}

export default RepliedToBySomeoneYouFollowFeed
