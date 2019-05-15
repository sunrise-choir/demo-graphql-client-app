import React, { Component, useState } from 'react'
import { ApolloConsumer } from 'react-apollo'
import InfiniteScroll from 'react-infinite-scroller'
import { CursorContext } from '../cursor/cursorProvider'

function Scroller (WrappedComponent, itemsKey) {
  let endCursor = null

  return function (props) {
    const [items, setItems] = useState([])
    const { query, variables: queryVars } = props

    return (
      <CursorContext.Consumer>
        {(context) => {
          context = context || {}
          return (<ApolloConsumer>
            { client => {
              return (
                <InfiniteScroll
                  pageStart={0}
                  threshold={1000}
                  loadMore={(page) => {
                    console.log('loading more', endCursor, page)
                    const variables = {
                      after: page === 1 ? context.cursor : endCursor, // Use the global cursor for the first item. This scroller's first page is 1, even though we set pageStart to 0. Weird.
                      first: 1, // Oddly, loading only one at a time means react is less laggy because it has less work to do for each setState call.
                      ...queryVars
                    }

                    client.query({ query, variables })
                      .then(({ data }) => {
                        const { [itemsKey]: { edges, pageInfo: { endCursor: latestEndCursor } } } = data

                        const nodes = edges.map(edge => edge.node)

                        endCursor = latestEndCursor
                        setItems((prevState) => prevState.concat(nodes))
                      })
                  }}
                  hasMore
                  useWindow
                  loader={<div className='loader' key={0}>Loading ...</div>}
                >
                  <WrappedComponent items={items} />
                </InfiniteScroll>
              )
            }}
          </ApolloConsumer>)
        }}
      </CursorContext.Consumer>
    )
  }
}
export default Scroller
