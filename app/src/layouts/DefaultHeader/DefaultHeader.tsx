import React from 'react'
import classes from './DefaultHeader.module.scss'
import { Link, useHistory } from 'react-router-dom'
import useAuthManager from 'hooks/useAuthManager'
import GeneralButton from 'components/GeneralButton'

export default function DefaultHeader() {
  const { isSignedIn, signOut } = useAuthManager()
  const hs = useHistory()

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
            <GeneralButton onClick={signOut}>LOG OUT</GeneralButton>
          ) : (
            <GeneralButton
              onClick={() => {
                hs.push('/login')
              }}
            >
              LOG IN
            </GeneralButton>
          )}
        </div>
      </div>
    </div>
  )
}
