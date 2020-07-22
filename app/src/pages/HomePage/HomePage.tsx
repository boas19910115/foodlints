import React from 'react'
import SearchInputField from 'components/SearchInputField'
import classes from './HomePage.module.scss'

export default function HomePage() {
  return (
    <div className={classes.root}>
      <SearchInputField></SearchInputField>
    </div>
  )
}
