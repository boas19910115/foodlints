import React from 'react'
import DefaultHeader from './DefaultHeader'
import DefaultFooter from './DefaultFooter'
import classes from './DefaultLayout.module.scss'

interface CustomProps extends React.Props<any> {
  isFlexLayoutContent: boolean
}

export default function DefaultLayout(props: CustomProps) {
  const { children, isFlexLayoutContent } = props
  return (
    <div className={classes.layoutContainer}>
      <DefaultHeader></DefaultHeader>
      <div
        className={
          isFlexLayoutContent
            ? classes.layoutContentFlex
            : classes.layoutContent
        }
      >
        {children}
      </div>
      <DefaultFooter></DefaultFooter>
    </div>
  )
}
