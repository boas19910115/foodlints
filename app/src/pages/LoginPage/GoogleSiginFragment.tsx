import React, { useCallback } from 'react'
import classes from './LoginPage.module.scss'
import GeneralButton from 'components/GeneralButton'
import useAuthManager from 'hooks/useAuthManager'

export default function GoogleSiginFragment() {
  const { googleSignin } = useAuthManager()
  const onGoogleButtonClick = useCallback(async () => {
    const user = await googleSignin()
    console.log(user)
    return user
  }, [googleSignin])
  return (
    <div className={classes.GoogleSiginFragment}>
      <GeneralButton onClick={onGoogleButtonClick}>Google</GeneralButton>
    </div>
  )
}
