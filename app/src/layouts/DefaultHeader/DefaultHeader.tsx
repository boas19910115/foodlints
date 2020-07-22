import React from 'react';
import classes from './DefaultHeader.module.scss';
import { Link } from 'react-router-dom';

export default function DefaultHeader() {
  return (
    <div className={classes.container}>
      <div className={classes.inner}>
        <div className={classes.logo}>
          <i>Foodlints</i>
        </div>
        <div className={classes.menu}>
          <Link to="/">HOME</Link>
          <Link to="/member">MEMBER</Link>
        </div>
      </div>
    </div>
  );
}
