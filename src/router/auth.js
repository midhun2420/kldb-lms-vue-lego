const Layout = () => import(/* webpackChunkName: "login" */'../layouts/BlankLayout');
// const Login = () => import('../views/auth/Login');

export default {
    path: '/',
    name: 'AuthLayout',
    redirect: '/login/',
    component: Layout,
    children: [
        {
            path: '/login/',
            name: 'Login',
            component: () => import('../views/auth/Login')
        },
        {
            path: '/logout/',
            name: 'Logout',
            component: () => import('../views/auth/logout')
        },
        {
            path: '/reset-password/',
            name: 'ResetPassword',
            component: () => import('../views/auth/ResetPasswordPage')
        },
        {
            path: '/check-mail/',
            name: 'CheckMail',
            component: () => import('../views/auth/CheckMailPage')
        },
        {
            path: '/set-new-password/',
            name: 'SetNewPassword',
            component: () => import('../views/auth/SetNewPasswordPage')
        },
        {
            path: '/create-account/',
            name: 'CreateAccountPage',
            component: () => import('../views/auth/CreateAccountPage')
        }
    ]
};
