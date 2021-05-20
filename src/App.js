import React from 'react';

// components
import Locales from 'components/Locales';
import Foods from 'components/Foods';
import DynamicForm from 'components/DynamicForm';

// styles
import useStyles from './styles';

export default function App() {
  const classes = useStyles();
  

  return (
    <div className={classes.root}>
      <h2>Autocomplete</h2>
      <Locales />

      <h3>Multiple & Group Foods</h3>
      <Foods />

      <h2>Dynamic Forms</h2>
      <DynamicForm />
    </div>
  );
}
