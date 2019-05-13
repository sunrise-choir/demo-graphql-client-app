import React from 'react'
import { Route, Link } from 'react-router-dom'
import { MenuItem, Button } from 'react-foundation'

export default function NavItem ({ children, to, exact }) {
  return (
    <Route path={to} exact={exact} children={({ match }) => (
      <MenuItem isActive={!!match} >
        <Link to={to}>{children}</Link>
      </MenuItem>
    )} />
  )
}
