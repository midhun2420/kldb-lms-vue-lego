import guards from './guards';

const Layout = () => import(/* webpackChunkName: "layout" */'../layouts/MainLayout');
// const Home = () => import(/* webpackChunkName: "home" */'../views/Home');
// const About = () => import(/* webpackChunkName: "home" */'../views/About');

export default {
    path: '/',
    name: 'DashboardLayout',
    redirect: '/home/',
    component: Layout,
    beforeEnter: guards.loggedInGuard,
    children: [
        {
            path: '/ah-section/',
            name: 'AhSection',
            component: () => import('../views/cows/AhSection')
        },
        {
            path: '/cows-list/',
            name: 'CowsList',
            component: () => import('../views/cows/cows-lilst/CowsLIstPage')
        },
        {
            path: '/cows-registration/',
            name: 'CowsRegistrationMain',
            component: () => import('../views/cows/registration/CowsRegistrationMainPage')
        },
        {
            path: '/cows-dehorning-1/',
            name: 'Dehorning1',
            component: () => import('../views/cows/dehorning/CowsDehorningFirstPage')
        },
        {
            path: '/cows-dehorning-2/',
            name: 'Dehorning2',
            component: () => import('../views/cows/dehorning/CowsDehorningSecondPage')
        },
        {
            path: '/cows-dehorning-3/',
            name: 'Dehorning3',
            component: () => import('../views/cows/dehorning/CowsDehorningThirdPage')
        },
        {
            path: '/cows-deworming-1/',
            name: 'Deworming1',
            component: () => import('../views/cows/deworming/CowsDewormingFirstPage')
        },
        {
            path: '/cows-deworming-2/',
            name: 'Deworming2',
            component: () => import('../views/cows/deworming/CowsDewormingSecondPage')
        },
        {
            path: '/cows-deworming-3/',
            name: 'Deworming3',
            component: () => import('../views/cows/deworming/CowsDewormingThirdPage')
        },
        {
            path: '/cows-nose-punching/',
            name: 'NosePunching1',
            component: () => import('../views/cows/nose-punching/CowsNosePunching')
        },
        {
            path: '/cows-nose-punching-2/',
            name: 'NosePunching2',
            component: () => import('../views/cows/nose-punching/CowsNosePunching1')
        },
        {
            path: '/cows-nose-punching-3/',
            name: 'NosePunching3',
            component: () => import('../views/cows/nose-punching/CowsNosePunching2')
        },
        {
            path: '/cows-weight-recording/',
            name: 'CowsWeightRecording',
            component: () => import('../views/cows/CowsWeightRecording')
        },
        {
            path: '/cow-vaccination/',
            name: 'CowVaccination',
            component: () => import('../views/cows/CowVaccination')
        },
        {
            path: '/cow-screening/',
            name: 'CowScreening',
            component: () => import('../views/cows/CowScreening')
        },
        {
            path: '/cows-mating-program/',
            name: 'MatingProgram',
            component: () => import('../views/cows/mating-program/MatingProgram')
        },
        {
            path: '/cows-milk-disposal/',
            name: 'CowsMilkDisposal',
            component: () => import('../views/cows/MilkDisposal')
        },
        {
            path: '/cow-lactation-status/',
            name: 'LactationStatus',
            component: () => import('../views/cows/LactationStatus')
        },
        {
            path: '/cows-daily-milk-recording/',
            name: 'DailyMilkRecording',
            component: () => import('../views/cows/daily-milk-recording/DailyMilkRecording')
        },
        {
            path: '/cows-daily-milk-recording-list/',
            name: 'DailyMilkRecordingList',
            component: () => import('../views/cows/daily-milk-recording/DailyMilkRecordingList')
        },
        {
            path: '/cows-abortion-event/',
            name: 'CowsAbortionEvent',
            component: () => import('../views/cows/abortion/AbortionEvent')
        },
        {
            path: '/cows-calving-details/',
            name: 'CowsCalvingDetails',
            component: () => import('../views/cows/calving-details/CalvingDetails')
        },
        {
            path: '/cows-pregnancy-checkup/',
            name: 'CowsPregnanacyCheckup',
            component: () => import('../views/cows/pregnancy-checkup/PregnancyCheckup')
        },
        {
            path: '/cows-artificial-insemination/',
            name: 'CowsArtificialIncemination',
            component: () => import('../views/cows/artificial-insemination/ArtificialInsemination')
        },
        {
            path: '/cow/:id/details/',
            name: 'CowDetailPage',
            component: () => import('../views/cows/HerdManagement/CowDetails')
        }
    ]
};
