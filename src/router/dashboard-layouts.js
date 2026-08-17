const Layout = () => import(/* webpackChunkName: "login" */'../layouts/BlankLayout');
// const Login = () => import('../views/auth/Login');

export default {
    path: '/',
    name: 'AuthLayout',
    redirect: '/home/',
    component: Layout,
    children: [
        // {
        //     path: '/home/',
        //     name: 'Home',
        //     component: () => import('../views/Home')
        // }
        // {
        //     path: '/semen-station/',
        //     name: 'SemenStation',
        //     component: () => import('../views/SemenStationPage')
        // }
    ]
};
