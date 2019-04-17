import React, {Component} from 'react'
import {ApolloConsumer} from "react-apollo"
import gql from "graphql-tag";
import InfiniteScroll from 'react-infinite-scroller';

const query = gql`
  query($next: Int, $after: String){
    threads(next: $next, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        root {
          id
          author {
            id
          }
        }
      }
    }
  }
`

//function Threads({onNewEndCursor, endCursor}) {
//
//    return (
//      <Query query={query} variables={{next:40, after: endCursor}}>
//          {({loading, error, data})=>{
//            if(loading)
//              return <div>Loading more threads...</div>
//
//            const {threads, threads:{pageInfo:{endCursor}}} = data
//            console.log("got a new endCursor", endCursor);
//            onNewEndCursor(endCursor)
//
//            return threads.nodes.map((thread)=>{
//              return(
//                <div key={thread.root.id}>
//                  {thread.root.id}
//                </div>
//              )
//            })
//          }}
//      </Query>
//    )
//}
function Threads({threads}) {
  return threads.map((thread)=>{
    return(
      <div key={thread.root.id}>
        {thread.root.id}
      </div>
    )
  })
}

class PublicFeed extends Component{
  constructor(props){
    super(props)
    this.startCursor = props.cursor,
    this.endCursor = null
    this.state = {
      threads: []
    }
    console.log(this.props.scrollParentRef);
  }

  render(){
    return (
      <ApolloConsumer>
        { client => {
          return(
            <InfiniteScroll
            pageStart={0}
            loadMore={ (page)=>{
              console.log("trying to load more with page:", page);
              const variables = {
                after: this.endCursor,
                next: 20
              }
              client.query({query, variables})
                .then(({data}) => {
                  const {threads:{nodes, pageInfo:{endCursor}}} = data

                  this.endCursor = endCursor
                  const threads = this.state.threads

                  nodes.forEach(node => threads.push(node))

                  this.setState({threads})
                })
            }}
            hasMore={true || false}
            useWindow={false}
            getScrollParent={this.props.getScrollParent}
            loader={<div className="loader" key={0}>Loading ...</div>}
            >
              <Threads threads={this.state.threads}/>
            </InfiniteScroll>
          )
        }}
      </ApolloConsumer>
    )
  }

}

export default PublicFeed
