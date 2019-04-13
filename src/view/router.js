import React, {Suspense, lazy} from 'react';
import {Switch, Route, Redirect} from 'react-router'
import {Skeleton} from 'antd'
import PrivateRoute from '@com/PrivateRoute';
import util from '@util'
import E404 from '@view/404';

export const Menus = [
    {
        name: '账号列表',
        path: '/account',
        icon: 'skin',
        role: [2, 3],
        component: lazy(() => import('@view/account')),
    },
    {
        name: '商户列表',
        path: '/brands',
        icon: 'experiment',
        role: [3],
        component: lazy(() => import('@view/brands')),
    },
    {
        name: '订单列表',
        path: '/order',
        icon: 'tags',
        role: [2, 3],
        component: lazy(() => import('@view/order')),
    },
    {
        name: '充值记录',
        path: '/payRecord',
        icon: 'pay-circle',
        role: [3,4],
        component: lazy(() => import('@view/payRecord')),
    },
    {
        name: 'IP列表',
        path: '/ip',
        icon: 'bulb',
        role: [3],
        component: lazy(() => import('@view/ip')),
    },
    {
        name: '上游账号列表',
        path: '/upAccount',
        icon: 'project',
        role: [3, 4],
        component: lazy(() => import('@view/upAccount')),
    },
]


export default function Router() {
    return (
        <Suspense fallback={<Skeleton loading={true} active avatar/>}>
            <Switch>
                <Route path='/' exact render={()=><Redirect to={util.getHomePath()}/>}/>
                {
                    Menus.map((it,key)=>(
                        <PrivateRoute component={it.component}
                               key={key}
                               role={it.role}
                               path={it.path}/>
                    ))
                }
                <Route component={E404} />
            </Switch>
        </Suspense>
    )
}
