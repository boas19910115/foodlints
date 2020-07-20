import React, { useEffect } from 'react';
import DefaultHeader from './DefaultHeader';
import DefaultFooter from './DefaultFooter';
import classes from './DefaultLayout.module.scss';
import backendFunctions from 'services/firebase/functions';

export default function DefaultLayout(props: React.Props<any>) {
  const { children } = props;
  useEffect(() => {
    backendFunctions
      .getAllRestaurantNames()
      .then((res) => {
        console.log(res.data.names.map((n: string) => n.replace(/"/g, '')));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className={classes.layoutContainer}>
      <DefaultHeader></DefaultHeader>
      <div className={classes.layoutContent}>{children}</div>
      <DefaultFooter></DefaultFooter>
    </div>
  );
}
