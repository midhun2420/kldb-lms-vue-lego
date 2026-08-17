import guards from './guards';

const Layout = () => import('../layouts/MainLayout');

export default {
    path: '/',
    name: 'DashboardLayout',
    redirect: '/home/',
    component: Layout,
    beforeEnter: guards.loggedInGuard,
    children: [
        {
            path: '/reports/',
            name: 'reports',
            component: () => import('../views/reports/reportsHome')
        },
        {
            path: '/reports/bulls/',
            name: 'bullsReports',
            component: () => import('../views/reports/bull/bullReportHome')
        },
        {
            path: '/reports/cows/',
            name: 'cowsReports',
            component: () => import('../views/reports/cow/cowReportHome')
        },
        {
            path: '/reports/quality-control/',
            name: 'QCReports',
            component: () => import('../views/reports/QC/QCReportsHome')
        },
        {
            path: '/reports/others/',
            name: 'cowsReports',
            component: () => import('../views/reports/common/commonReportHome')
        },
        {
            path: '/reports/training/',
            name: 'trainingReports',
            component: () => import('../views/reports/training/trainingReportHome')
        }
    ]
};
