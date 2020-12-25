import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { Home } from './features/home';
import { PatientForm } from './features/patientForm';
import { PatientsList } from './features/patientsList';

import  { Routes } from './Routes';

function App() {
  return (
    <HashRouter>
        <Switch>
          <Route exact path={Routes.Home} component={ Home }/>
          <Route exact path={Routes.PatientForm} component={ PatientForm }/>
          <Route exact path={Routes.PatientsList} component={ PatientsList }/>
        </Switch>     
    </HashRouter> 
  );
}

export default App;
