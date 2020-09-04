import React, { Component } from 'react';
import './App.css';

import { Provider } from 'react-redux';
import { loadUser } from '../actions/auth';

import store from '../store';
import Header from './layout/Header';
import Profile from './profile/Profile'
import OtherProfile from './profile/OtherProfile'
import Feed from './feed/Feed';
import Explore from './explore/Explore';
import RegisterForm from './auth/RegisterForm';
import LoginForm from './auth/LoginForm';
import RecipeDelete from './recipe/RecipeDelete';
import RecipeEdit from './recipe/RecipeEdit';
import RecipeDetail from './recipe/RecipeDetail';

import { 
  BrowserRouter as Router,
  Route,
  Switch,    
} from 'react-router-dom';
import PrivateRoute from './common/PrivateRoute';


class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        {/* Structure:
        PrivateRoute: Dashboard    - Contains RecipeList, along with the ingredients and recipe parts.
        Route:        RecipeDelete - Path is the API link to delete a recipe. Needs recipe ID input
        Route:        RecipeEdit   - Path is the API link to edit a recipe. Needs a recipe ID input
        Route:        LoginForm    - Path is some Login thing. Should be redirected here if user is not signed in. */}
        
        <Router>
          <Header />
          <Switch>
            <PrivateRoute exact path='/' component={Profile} />
            <Route exact path='/profile/:id' component={OtherProfile} />
            <Route exact path='/recipe/:id' component={RecipeDetail} />
            <Route exact path='/feed' component={Feed} />
            <Route exact path='/explore' component={Explore} />
            <Route exact path='/register' component={RegisterForm} />
            <Route exact path='/login' component={LoginForm} />
            <Route exact path='/delete/:id' component={RecipeDelete} />
            <Route exact path='/edit/:id' component={RecipeEdit} />
          </Switch>
        </Router>
      </Provider>

    );
  }
}

export default App;