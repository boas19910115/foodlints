import React from 'react'
import classes from './DefaultHeader.module.scss'
import { Link } from 'react-router-dom'
import useAuthManager from 'hooks/useAuthManager'

export default function DefaultHeader() {
  const { isSignedIn, signOut } = useAuthManager()

  return (
    <div className={classes.container}>
      <div className={classes.inner}>
        <div className={classes.logo}>
          <i>Foodlints</i>
        </div>
        <div className={classes.menu}>
          <Link to="/">HOME</Link>
          <Link to="/member">MEMBER</Link>
          {isSignedIn ? (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <span onClick={signOut}>LOG OUT</span>
          ) : (
            <Link to="/login">LOG IN</Link>
          )}
        </div>
      </div>
    </div>
  )
}
