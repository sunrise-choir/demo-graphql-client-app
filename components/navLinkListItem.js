import classnames from 'classnames'
import React, {PropTypes} from 'react'
import {Route, Link} from 'react-router-dom'

export default function NavItem({children, to, exact}) {
    return (
        <Route path={to} exact={exact} children={({match}) => (
            <li className={match ? 'is-active' : null}>
                <Link to={to}>{children}</Link>
            </li>
        )}/>
    )
}
