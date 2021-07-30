import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';

// views
import AutocompleteMaterial from 'views/AutocompleteMaterial/AutocompleteMaterial';
import Product from 'views/Product/Product';

// styles
import useStyles from './styles';

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.navbar}>
        <NavLink to="/autocomplete-material" activeClassName="active">
          <Button color="primary">Autocomplete Material UI</Button>
        </NavLink>
        <NavLink to="/form-with-ref" activeClassName="active">
          <Button color="primary">Form with Ref</Button>
        </NavLink>
      </div>
      <br />
      <Switch>
        <Route exact path="/"><Product /></Route>
        <Route exact path="/form-with-ref"><Product /></Route>
        <Route exact path="/autocomplete-material"><AutocompleteMaterial /></Route>
      </Switch>
    </div>
  );
}
