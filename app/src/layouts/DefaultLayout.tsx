import React from 'react'
import DefaultHeader from './DefaultHeader'
import DefaultFooter from './DefaultFooter'
import classes from './DefaultLayout.module.scss'

export default function DefaultLayout(props: React.Props<any>) {
  const { children } = props
  return (
    <div className={classes.layoutContainer}>
      <DefaultHeader></DefaultHeader>
      <div className={classes.layoutContent}>{children}</div>
      <DefaultFooter></DefaultFooter>
    </div>
  )
}
