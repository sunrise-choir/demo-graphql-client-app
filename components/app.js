import React from 'react'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Sticky, StickyContainer } from 'react-sticky'

import { Link, Button, Menu, ResponsiveNavigation, Alignments, ButtonGroup } from 'react-foundation'
import NavLinkListItem from './router/navLinkListItem'
import PublicFeed from './feeds/publicFeed'
import PrivateFeed from './feeds/privateFeed'
import MentionsFeed from './feeds/mentionsFeed'
import ParticipatingFeed from './feeds/participatingFeed'
import BySomeoneYouFollowFeed from './feeds/bySomeoneYouFollowFeed'
import RepliedToBySomeoneYouFollowFeed from './feeds/repliedToBySomeoneYouFollowFeed'

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
})

function Profile () {
  return <h2>Profile</h2>
}

function Private () {
  return <h2>Private</h2>
}

function Post ({ match: { params: { id } } }) {
  // !!NOTE!! id has the % sigil removed to make it possible to uri encode the message id. It gets added back on here.
  const messageId = `%${decodeURIComponent(id)}`
  return <h2>Post for {messageId}</h2>
}
function Author ({ match: { params: { id } } }) {
  const authorId = decodeURIComponent(id)
  return <h2>Author {authorId}</h2>
}

function App (props) {
  let scrollParentRef
  const getScrollParent = () => {
    return scrollParentRef
  }
  return (
    <StickyContainer>
      <ApolloProvider client={client}>
        <Router>
          <Sticky>{({ style }) => {
            return (
              <ResponsiveNavigation style={style} >
                <Menu isExpanded isVertical horizontalOnMedium>
                  <NavLinkListItem to='/private'>Private</NavLinkListItem>
                  <NavLinkListItem to='/mentions'>Mentions</NavLinkListItem>
                  <NavLinkListItem to='/profile'>Profile</NavLinkListItem>
                  <NavLinkListItem to='/bySomeoneYouFollow'>By Someone You Follow</NavLinkListItem>
                  <NavLinkListItem to='/repliedToBySomeoneYouFollow'>Replied To By Someone You Follow</NavLinkListItem>
                  <NavLinkListItem to='/participating'>Participating</NavLinkListItem>
                  <NavLinkListItem to='/public'>All</NavLinkListItem>
                </Menu>
                <ul className='menu'>
                  <li><input type='search' size={50} placeholder='Search: eg Sunrise Choir AND Mikey NOT singing' /></li>
                  <li><button type='button' className='button'>Search</button></li>
                </ul>
              </ResponsiveNavigation>
            )
          }}
          </Sticky>
          <div className='cell auto cell-block-container' ref={ref => { scrollParentRef = ref }}>
            <div className='grid-x' >
              <div id='content-view' className='cell auto'>
                <Switch>
                  <Route path='/public' exact component={() => <PublicFeed getScrollParent={getScrollParent} />} />
                  <Route path='/private/' component={() => <PrivateFeed />} />
                  <Route path='/participating/' component={() => <ParticipatingFeed getScrollParent={getScrollParent} />} />
                  <Route path='/bySomeoneYouFollow/' component={() => <BySomeoneYouFollowFeed getScrollParent={getScrollParent} />} />
                  <Route path='/repliedToBySomeoneYouFollow/' component={() => <RepliedToBySomeoneYouFollowFeed getScrollParent={getScrollParent} />} />
                  <Route path='/profile' component={Profile} />
                  <Route path='/mentions/' component={() => <MentionsFeed getScrollParent={getScrollParent} />} />
                  <Route path='/post/:id' component={Post} />
                  <Route path='/author/:id' component={Author} />
                  <Redirect from='/' to='/bySomeoneYouFollow' />
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      </ApolloProvider>
    </StickyContainer>
  )
}

export default App
