import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import LayoutContainer from '../LayoutContainer';

// route components
import HomeContainer from './HomeContainer';
import NewGatheringContainer from './NewGatheringContainer';
import GatheringContainer from './GatheringContainer';
import NewStreamContainer from './NewStreamContainer';
import Memberetc from './Memberetc';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <LayoutContainer match={browserHistory}>
    	<Switch>
	      <Route exact path="/" component={HomeContainer}/>
	      <Route exact path="/create-a-gathering" component={NewGatheringContainer} />
	      <Route exact path="/create-a-stream" component={NewStreamContainer} />
	      <Route path="/gathering/:id" component={GatheringContainer} />
	      <Route exact path="/member" component={Memberetc} />
	      {/*<Route path="*" component={NotFoundPage}/>*/}
	    </Switch>
    </LayoutContainer>
  </Router>
);