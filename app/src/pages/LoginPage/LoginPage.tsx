import React from 'react'
import classes from './LoginPage.module.scss'
import GoogleSiginFragment from './GoogleSiginFragment'
import FacebookSiginFragment from './FacebookSiginFragment'

export default function LoginPage() {
  return (
    <div className={classes.root}>
      <GoogleSiginFragment></GoogleSiginFragment>
      <FacebookSiginFragment></FacebookSiginFragment>
    </div>
  )
}
