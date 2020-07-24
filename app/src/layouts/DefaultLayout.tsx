import React from 'react'
import DefaultHeader from './DefaultHeader'
import DefaultFooter from './DefaultFooter'
import classes from './DefaultLayout.module.scss'
import classnames from 'classnames'

interface CustomProps extends React.Props<any> {
  isFlexLayoutContent: boolean
  isFlexColumn?: boolean
}

export default function DefaultLayout(props: CustomProps) {
  const { children, isFlexLayoutContent, isFlexColumn } = props
  return (
    <div className={classes.layoutContainer}>
      <DefaultHeader></DefaultHeader>
      <div
        className={classnames(
          isFlexLayoutContent
            ? classes.layoutContentFlex
            : classes.layoutContent,
          isFlexColumn ? classes.flexColumn : ''
        )}
      >
        {children}
      </div>
      <DefaultFooter></DefaultFooter>
    </div>
  )
}
