import React from 'react';

// components
import Locales from 'components/Locales';
import Foods from 'components/Foods';

// styles
import useStyles from 'styles';

export default function AutocompleteMaterial() {
  const classes = useStyles();
  

  return (
    <div className={classes.root}>
      <h2>Autocomplete</h2>
      <br />
      <Locales />

      <br />
      <h3>Multiple & Group Foods</h3>
      <br />
      <Foods />
    </div>
  );
}
