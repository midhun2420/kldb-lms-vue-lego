import Vue from 'vue';
import VueRouter from 'vue-router';
import appRoutes from './app-layout';
import authRoutes from './auth';
import dashboardRoutes from './dashboard-layouts';
import masterRoutes from './master-layout';
import cowsRoutes from './cows-routes';
import reportsRoutes from './reports';

Vue.use(VueRouter);

const routes = [
    appRoutes,
    authRoutes,
    dashboardRoutes,
    masterRoutes,
    cowsRoutes,
    reportsRoutes
];

if (process.env.NODE_ENV !== 'production') {
    const docsRoutes = require('lego-framework/src/router/docs-layout');
    routes.push(docsRoutes.default);
}

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {
                x: 0,
                y: 0
            };
        }
    }
});

router.beforeResolve((to, from, next) => {
    if (to.name) {
    }
    next();
});

router.afterEach(() => {
});

export default router;
