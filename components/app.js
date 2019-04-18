import React from 'react'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import NavLinkListItem from './navLinkListItem'
import PublicFeed from './publicFeed'
import ParticipatingFeed from './participatingFeed'
import BySomeoneYouFollowFeed from './bySomeoneYouFollowFeed'
import RepliedToBySomeoneYouFollowFeed from './repliedToBySomeoneYouFollowFeed'

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
})

function Profile () {
  return <h2>Profile</h2>
}

function Mentions () {
  return <h2>Mentions</h2>
}

function Private () {
  return <h2>Private</h2>
}

function App (props) {
  let scrollParentRef
  const getScrollParent = () => {
    return scrollParentRef
  }
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='grid-y large-grid-frame'>
          <div id='topbar' className='top-bar'>
            <div className='top-bar-left'>
              <ul className='menu'>
                <NavLinkListItem to='/private'>Private</NavLinkListItem>
                <NavLinkListItem to='/mentions'>Mentions</NavLinkListItem>
                <NavLinkListItem to='/profile'>Profile</NavLinkListItem>
              </ul>
            </div>
            <div className='top-bar-right'>
              <ul className='menu'>
                <li><input type='search' size={50} placeholder='Search: eg Sunrise Choir AND Mikey NOT singing' /></li>
                <li><button type='button' className='button'>Search</button></li>
              </ul>
            </div>
          </div>
          <div className='cell large-auto large-cell-block-container'>
            <div className='grid-x'>
              <div id='sidebar' className='cell large-2 large-cell-block-y'>
                <nav>
                  <ul className='vertical menu'>
                    <li className='menu-text'>Feeds</li>
                    <NavLinkListItem to='/bySomeoneYouFollow'>By Someone You Follow</NavLinkListItem>
                    <NavLinkListItem to='/repliedToBySomeoneYouFollow'>Replied To By Someone You Follow</NavLinkListItem>
                    <NavLinkListItem to='/participating'>Participating</NavLinkListItem>
                    <NavLinkListItem to='/public'>All</NavLinkListItem>
                  </ul>
                </nav>
              </div>
              <div className='cell large-10 large-cell-block-y' ref={ref => { scrollParentRef = ref }}>
                <div className='grid-x' >
                  <div id='content-view' className='large-12'>
                    <Switch>
                      <Route path='/public' exact component={() => <PublicFeed getScrollParent={getScrollParent} />} />
                      <Route path='/private/' component={Private} />
                      <Route path='/participating/' component={() => <ParticipatingFeed getScrollParent={getScrollParent} />} />
                      <Route path='/bySomeoneYouFollow/' component={() => <BySomeoneYouFollowFeed getScrollParent={getScrollParent} />} />
                      <Route path='/repliedToBySomeoneYouFollow/' component={() => <RepliedToBySomeoneYouFollowFeed getScrollParent={getScrollParent} />} />
                      <Route path='/profile' component={Profile} />
                      <Route path='/mentions' component={Mentions} />
                      <Redirect from='/' to='/bySomeoneYouFollow' />
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  )
}

export default App
