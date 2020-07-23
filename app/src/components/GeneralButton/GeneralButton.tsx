import React from 'react'
import { Button, ButtonProps } from 'react-bootstrap'
import classes from './GeneralButton.module.scss'
import classnames from 'classnames'

export default function GeneralButton(props: ButtonProps) {
  const { className, children, ...rest } = props
  return (
    <Button className={classnames(classes.GeneralButton, className)} {...rest}>
      {children}
    </Button>
  )
}
