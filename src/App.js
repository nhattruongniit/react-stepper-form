import React from 'react';

// components
import Locales from 'components/Locales';
import Foods from 'components/Foods';

// styles
import useStyles from './styles';

export default function App() {
  const classes = useStyles();
  

  return (
    <div className={classes.root}>
      <h3>Autocomplete Simple</h3>
      <Locales />

      <h3>Multiple & Group Foods</h3>
      <Foods />
     
    </div>
  );
}
