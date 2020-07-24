import React from 'react'
import { Button, ButtonProps } from 'react-bootstrap'
import classes from './GeneralButton.module.scss'
import classnames from 'classnames'

interface GeneralButtonProps extends ButtonProps {
  CompType?: React.FunctionComponent<ButtonProps> | keyof HTMLElementTagNameMap
}

export default function GeneralButton(props: GeneralButtonProps) {
  const { className, children, CompType, ...rest } = props
  if (CompType) {
    if (typeof CompType === 'string') {
      return React.createElement(
        CompType,
        {
          className: classnames(classes.GeneralButton, className, 'btn'),
          ...rest,
        },
        children
      )
    } else {
      return (
        <CompType
          className={classnames(classes.GeneralButton, className, 'btn')}
          {...rest}
        >
          {children}
        </CompType>
      )
    }
  }
  return (
    <Button className={classnames(classes.GeneralButton, className)} {...rest}>
      {children}
    </Button>
  )
}
