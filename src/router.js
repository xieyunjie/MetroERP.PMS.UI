import React from 'react';
import { Router, Route, Switch } from 'dva/router'; 
import HomeView from './routes/Home/HomeView'

const routes = (
  <Route component={HomeView} >  
  </Route> 
)

function RouterConfig({ history }) {
  return (
    <Router history={history}> 
    <Switch>
      {routes}
    </Switch>
    </Router>
  );
}

export default RouterConfig;
