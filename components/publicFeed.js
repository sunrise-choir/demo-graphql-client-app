import React, {Component, PureComponent} from 'react'
import {ApolloConsumer, Query} from "react-apollo"
import gql from "graphql-tag";
import InfiniteScroll from 'react-infinite-scroller'
import ReactMarkdown from 'react-markdown'

import blobLinkToUrl from '../lib/blobLinkToUrl'
import replaceEmojiWithUnicode from '../lib/replaceEmojiWithUnicode'


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
          text
          author {
            id
            name
            imageLink
          }
        }
      }
    }
  }
`

class AuthorThumbnail extends PureComponent {
  render(){
    const {author} = this.props
    return(
      <div className="grid-x">
        <div className="cell small-4">
          <img src={blobLinkToUrl(author.imageLink)}/>
        </div>
        <div className="cell">
          {author.name}
        </div>
      </div>
    )
  }
}

class Thread extends PureComponent{
  render(){
    const {thread} = this.props
    return(
      <div className="grid-x">
        <div className="cell small-2">
          <AuthorThumbnail author={thread.root.author} />
        </div>
        <div className="cell small-10">
          <ReactMarkdown source={thread.root.text} renderers={{text: replaceEmojiWithUnicode}} transformImageUri={blobLinkToUrl}/>
        </div>
        <div>
        </div>
      </div>
    )
  }
}

function Threads({threads}) {
  return threads.map((thread)=>{
    return(
      <div className="grid-x" key={thread.root.id}>
        <div className="cell medium-8 medium-offset-2 small-offset-1" >
          <Thread thread={thread} />
        </div>
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
  }

  render(){
    return (
      <ApolloConsumer>
        { client => {
          return(
            <InfiniteScroll
            pageStart={0}
            threshold={1000}
            loadMore={ (page)=>{
              const variables = {
                after: this.endCursor,
                next: 1 //Oddly, loading only one at a time means react is less laggy because it has less work to do for each setState call.
              }
              client.query({query, variables})
                .then(({data}) => {
                  const {threads:{nodes, pageInfo:{endCursor}}} = data

                  this.endCursor = endCursor
                  this.setState((prevState)=> ({threads: prevState.threads.concat(nodes)}))
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
