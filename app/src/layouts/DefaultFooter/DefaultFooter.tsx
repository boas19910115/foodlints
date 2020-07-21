import React from 'react';
import classes from './DefaultFooter.module.scss';

export default function DefaultFooter() {
  return (
    <div className={classes.container}>
      <div className={classes.inner}>FOOTER.©</div>
    </div>
  );
}
