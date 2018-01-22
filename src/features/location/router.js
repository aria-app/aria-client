import createBrowserHistory from 'history/createBrowserHistory';
import { connectRoutes } from 'redux-first-router';
import routeMap from './routeMap';

const history = createBrowserHistory();

export default connectRoutes(history, routeMap);
