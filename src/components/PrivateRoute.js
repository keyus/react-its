import React from 'react';
import {message} from 'antd';
import {Route, Redirect} from 'react-router';
import util from '@util'
import store from '@store'
import {logout} from '@action/user'

export const isAuthenticated =(rest)=>{
    const loginRole = util.getRole();
    const roleRoute = rest?.role;

    if(localStorage.getItem('token')){
        if(Array.isArray(roleRoute) && !roleRoute.includes(loginRole)){
            store.dispatch(logout())
            message.error('访问未授权页面，即将强制退出')
            return false;
        }
        return true;
    }
    return false;
}

export default function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated(rest) ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}
