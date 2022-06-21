import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from './features/home';
import { PatientForm } from './features/patientForm';
import { PatientsList } from './features/patientsList';

import  { Routes } from './Routes';

function App() {
  return (
    <Switch>
      <Route exact key={Routes.Home} path={Routes.Home} component={ Home }/>
      <Route exact key={Routes.PatientForm} path={Routes.PatientForm} component={ PatientForm }/>
      <Route exact key={Routes.PatientsList} path={Routes.PatientsList} component={ PatientsList }/>
    </Switch>     
  );
}

export default App;
