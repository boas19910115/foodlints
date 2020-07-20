import React from 'react';
import classes from './App.module.scss';
import HomePage from 'pages/HomePage';
import DefaultLayout from 'layouts/DefaultLayout';

function App() {
  return (
    <div className={classes.App}>
      <DefaultLayout>
        <HomePage></HomePage>
      </DefaultLayout>
    </div>
  );
}

export default App;
