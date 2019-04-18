import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'
import InfiniteScroll from 'react-infinite-scroller'

import Threads from './threads'

class Feed extends Component {
  constructor (props) {
    super(props)
    console.log('feed with props', props)
    this.startCursor = props.cursor
    this.endCursor = null
    this.state = {
      threads: []
    }
  }

  render () {
    const { query, variables: queryVars } = this.props
    return (
      <ApolloConsumer>
        { client => {
          return (
            <InfiniteScroll
              pageStart={0}
              threshold={1000}
              loadMore={(page) => {
                const variables = {
                  after: this.endCursor,
                  next: 1, // Oddly, loading only one at a time means react is less laggy because it has less work to do for each setState call.
                  ...queryVars
                }
                console.log(variables)
                client.query({ query, variables })
                  .then(({ data }) => {
                    const { threads: { nodes, pageInfo: { endCursor } } } = data

                    this.endCursor = endCursor
                    this.setState((prevState) => ({ threads: prevState.threads.concat(nodes) }))
                  })
              }}
              hasMore={true || false}
              useWindow={false}
              getScrollParent={this.props.getScrollParent}
              loader={<div className='loader' key={0}>Loading ...</div>}
            >
              <Threads threads={this.state.threads} />
            </InfiniteScroll>
          )
        }}
      </ApolloConsumer>
    )
  }
}

export default Feed
