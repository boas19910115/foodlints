import React, { useCallback } from 'react'
import classes from './LoginPage.module.scss'
import useAuthManager from 'hooks/useAuthManager'
import GeneralButton from 'components/GeneralButton'

export default function FacebookSiginFragment() {
  const { facebookSignin } = useAuthManager()
  const onFacebookButtonClick = useCallback(async () => {
    const user = await facebookSignin()
    console.log(user)
    return user
  }, [facebookSignin])
  return (
    <div className={classes.FacebookSiginFragment}>
      <GeneralButton onClick={onFacebookButtonClick}>Facebook</GeneralButton>
    </div>
  )
}
