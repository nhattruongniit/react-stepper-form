import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';

// views
import AutocompleteMaterial from 'views/AutocompleteMaterial/AutocompleteMaterial';
import Product from 'views/Product/Product';
import DynamicHookForm from 'views/DynamicHookForm/DynamicHookForm';
import CustomInput from 'views/CustomInput/CustomInput';

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
          <Button color="primary">Form with pure useRef</Button>
        </NavLink>
        <NavLink to="/dynamic-react-hook-form" activeClassName="active">
          <Button color="primary">Dynamic React Hook Form</Button>
        </NavLink>
        <NavLink to="/custom-input" activeClassName="active">
          <Button color="primary">Custom Pure Input</Button>
        </NavLink>
      </div>
      <br />
      <Switch>
        <Route exact path="/"><Product /></Route>
        <Route exact path="/form-with-ref"><Product /></Route>
        <Route exact path="/autocomplete-material"><AutocompleteMaterial /></Route>
        <Route exact path="/dynamic-react-hook-form"><DynamicHookForm /></Route>
        <Route exact path="/custom-input"><CustomInput /></Route>
      </Switch>
    </div>
  );
}
