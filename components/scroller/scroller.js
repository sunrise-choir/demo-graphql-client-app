import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'
import InfiniteScroll from 'react-infinite-scroller'

function Scroller (WrappedComponent, itemsKey) {
  return class extends Component {
    constructor (props) {
      super(props)
      this.startCursor = props.cursor
      this.endCursor = null
      this.state = {
        [itemsKey]: []
      }
    }

    render () {
      const { query, variables: queryVars } = this.props
      return (
        // Takes a child that is a function that returns a component
        <ApolloConsumer>
          { client => {
            return (
              <InfiniteScroll
                pageStart={0}
                threshold={1000}
                loadMore={(page) => {
                  const variables = {
                    after: this.endCursor,
                    first: 1, // Oddly, loading only one at a time means react is less laggy because it has less work to do for each setState call.
                    ...queryVars
                  }
                  client.query({ query, variables })
                    .then(({ data }) => {
                      const { [itemsKey]: { nodes, pageInfo: { endCursor } } } = data

                      this.endCursor = endCursor
                      this.setState((prevState) => ({ [itemsKey]: prevState[itemsKey].concat(nodes) }))
                    })
                }}
                hasMore
                useWindow={false}
                getScrollParent={this.props.getScrollParent}
                loader={<div className='loader' key={0}>Loading ...</div>}
              >
                <WrappedComponent items={this.state[itemsKey]} />
              </InfiniteScroll>
            )
          }}
        </ApolloConsumer>
      )
    }
  }
}
export default Scroller
