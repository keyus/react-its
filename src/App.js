import React, {Component} from 'react';
import {Router, Switch, Route} from 'react-router-dom'
import PrivateRoute from '@com/PrivateRoute';
import history from '@history';
import View from '@view';
import Login from '@view/login';

class App extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route component={Login} path='/login'/>
                    <PrivateRoute component={View} path='/'/>
                </Switch>
            </Router>
        );
    }
}

export default App;
