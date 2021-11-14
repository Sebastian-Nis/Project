import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Nav } from './components/Nav/Nav';
import { Auth } from './components/Auth/Auth';
import { Home } from './components/Home/Home';
import { Planner } from './components/Planner/Planner';
import { DamageChart } from './components/Planner/DamageChart';
import {GunDetails} from './components/Gun/GunDetails';
import { AuthContextProvider } from './components/Auth/Auth.context';
import { PrivateRoute} from './components/Auth/PrivateRoute';

import './App.css';
import { Profile } from './components/Profile/Profile';
import { Leaderboard } from './components/Leaderboard/Leaderboard';

function App() {
  return (
    <div className="container">
      <AuthContextProvider>
        <Router>
          <Nav className="navbar"/>
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/planner" component={Planner} />
            <Route path="/damagechart" component={DamageChart} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/gunDetails/:id" component={GunDetails} />
            <Route path="/login" component={Auth} />
            <Route path="/register" component={Auth} />
            <Route path="*" component={() => <h1>404 Page not found</h1>} />
          </Switch>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;