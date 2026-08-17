import guards from './guards';

const Layout = () => import(/* webpackChunkName: "layout" */'../layouts/MainLayout');
// const Home = () => import(/* webpackChunkName: "home" */'../views/Home');
// const About = () => import(/* webpackChunkName: "home" */'../views/About');

export default {
    path: '/',
    name: 'DashboardLayout',
    redirect: '/dashboard/',
    component: Layout,
    beforeEnter: guards.loggedInGuard,
    children: [
        // {
        //     path: '/',
        //     name: 'Home',
        //     component: Home
        // },
        // {
        //     path: '/',
        //     name: 'Home',
        //     component: Home
        // },
        // {
        //     path: '/about/',
        //     name: 'About',
        //     component: About
        // },
        // --------------------------bulls--------------------------------
        {
            name: 'SemenCollection',
            path: '/semen-collection/',
            component: () => import('../views/bulls/SemenCollectionListview')
        },
        {
            name: 'SemenCollectionAdd',
            path: '/semen-collection-add/',
            component: () => import('../views/bulls/SemenCollection')
        },
        {
            name: 'SemenCollectionEdit',
            path: '/semen-collection-edit/:id/details/',
            component: () => import('../views/bulls/SemenCollectionEdit')
        },
        {
            name: 'SemenCollectionAnimalEdit',
            path: '/semen-collection-animal-edit/:id/details/',
            component: () => import('../views/bulls/SemenCollectionAnimalEdit')
        },
        {
            name: 'HerdDetailsPage',
            path: '/animal/:id/details/',
            // component: () => import('../views/common-components/detailsPage')
            component: () => import('../views/common-components/details-page/DetailsPage')
        },
        {
            path: '/semen-collection-2/',
            name: 'SemenCollectionTwoPage',
            component: () => import('../views/bulls/SemenCollectionsTwoPage')
        },

        {
            path: '/semen-quarantine/',
            name: 'SemenQuarantine',
            component: () => import('../views/bulls/SemenQuarantine')
        },
        {
            path: '/semen-quaratine-1/',
            name: 'SemenQuarantinetwo',
            component: () => import('../views/bulls/SemenQuarantinetwo')
        },
        {
            path: '/semen-quaratine-2/',
            name: 'SemenQuaratineThreePage',
            component: () => import('../views/bulls/SemenQuaratineThreePage')
        },
        {
            path: '/bull-quarantine/',
            name: 'BullQuarantinePage',
            component: () => import('../views/bulls/BullQuaratineTwo')
            // component: () => import('../views/bulls/BullQuarantinePage')
        },
        {
            path: '/bull-quarantine-two/',
            name: 'BullQuaratineTwo',
            component: () => import('../views/bulls/BullQuaratineTwo')
        },
        {
            path: '/bull-quarantine-common',
            name: 'BullQuarantine',
            component: () => import('@/components/BullQuarntine/BullQuarantine.vue')
        },

        {
            path: '/quarantine-details/:id',
            name: 'BullQuarantineDetails',
            component: () => import('../components/BullQuarntine/quarantineDetail')
        },
        {
            path: '/clubbing-of-Semen-Dose/',
            name: 'ClubbingOfSemenDosePage',
            component: () => import('../views/bulls/ClubbingOfSemenDosePage')
        },
        {
            path: '/virtual-dispatching/',
            name: 'VirtualDispatching',
            component: () => import('../views/bulls/VirtualDispatching')
        },
        {
            path: '/virtual-dispatching/details/',
            name: 'VirtualDispatchingDetails',
            component: () => import('../components/showDispatchDetails')
        },
        {
            path: '/Semen-Destruction/',
            name: 'SemenDestruction',
            component: () => import('../views/SemenDestruction')
        },
        {
            path: '/semen-issue/',
            name: 'SemenIssue',
            component: () => import('../views/bulls/SemenIssue')
        },
        {
            path: '/bulls-list/',
            name: 'BullsListPage',
            component: () => import('../views/bulls/bulls-list/BullsLIstPage')
        },
        {
            path: '/register/',
            name: 'register-main-page',
            component: () => import('../views/bulls/registration/RegistrationMainPage')
        },
        {
            path: '/deworming-1/',
            name: 'Deworming1',
            component: () => import('../views/deworming/DewormingFirstPage')
        },
        {
            path: '/deworming-2/',
            name: 'Deworming2',
            component: () => import('../views/deworming/DewormingSecondPage')
        },
        {
            path: '/deworming-3/',
            name: 'Deworming3',
            component: () => import('../views/deworming/DewormingThirdPage')
        },
        {
            path: '/dehorning-1/',
            name: 'Dehorning1',
            component: () => import('../views/bulls/dehorning/DehorningFirstPage')
        },
        {
            path: '/dehorning-2/',
            name: 'Dehorning2',
            component: () => import('../views/bulls/dehorning/DehorningSecondPage')
        },
        {
            path: '/dehorning-3/',
            name: 'Dehorning3',
            component: () => import('../views/bulls/dehorning/DehorningThirdPage')
        },
        {
            path: '/semen-station/',
            name: 'SemenStation',
            component: () => import('../views/bulls/SemenStationPage')
        },
        {
            path: '/dehorning-disbudding-1/',
            name: 'DehorningDisbudding1',
            component: () => import('../views/DehorningDisbudding1')
        },
        {
            path: '/nose-punching/',
            name: 'NosePunching',
            component: () => import('../views/bulls/NosePunching')
        },
        {
            path: '/nose-punching-1/',
            name: 'NosePunching1',
            component: () => import('../views/bulls/NosePunching1')
        },
        {
            path: '/nose-punching-2/',
            name: 'NosePunching2',
            component: () => import('../views/bulls/NosePunching2')
        },
        {
            path: '/weight-recording/',
            name: 'WeightRecording1',
            component: () => import('../views/bulls/WeightRecording1')
        },
        {
            path: '/vaccination/',
            name: 'Vaccination',
            component: () => import('../views/bulls/Vaccination')
        },
        {
            path: '/bull-calf-selection/',
            name: 'BullCalfSelection1',
            component: () => import('../views/bulls/BullCalfSelection1')
        },
        {
            path: '/Adult-Bull-Screening/',
            name: 'AdultBullScreening',
            component: () => import('../views/AdultBullScreening')
        },
        {
            name: 'BullRegularizationList',
            path: '/bull-regularization-list/',
            component: () => import('../views/bulls/BullRegularizationList')
        },
        {
            path: '/bull-regularization/',
            name: 'BullRegularization',
            component: () => import('../views/bulls/BullRegularization')
        },
        {
            path: '/collection-schedule/',
            name: 'CollectionSchedule',
            component: () => import('../views/bulls/CollectionSchedule1')
        },
        {
            path: '/SemenCollectionNew/',
            name: 'SemenCollectionNew',
            component: () => import('../views/bulls/SemenCollectionNew')
        },
        // ----------bulls end---------
        // ------------ training---------
        {
            path: '/training-center/',
            name: 'TrainingCenterPage',
            component: () => import('../views/training/TrainingCenterPage')
        },
        // -------------training ends--------
        // host in qc
        {
            path: '/host-hos-gtest/',
            name: 'HostHosGtest',
            component: () => import('../views/quality-control/host-hos-g-test/HostHosGtest')
        },
        {
            path: '/host-hos-gtest/',
            name: 'HostHosGtest1',
            component: () => import('../views/quality-control/host-hos-g-test/HostHosGtest1')
        },
        {
            path: '/host-hos-gtest2/',
            name: 'HostHosGtest2',
            component: () => import('../views/quality-control/host-hos-g-test/HostHosGtest2')
        },
        // ---------------- host end-------------

        // ------------------------quality control-----------------------
        {
            path: '/air-culture/',
            name: 'AirCulturePage',
            component: () => import('../views/quality-control/AirCulturePage')
        },
        {
            path: '/quality-control/',
            name: 'QualityControl',
            component: () => import('../views/quality-control/QualityControl')
        },
        {
            path: '/post-thaw-motility/',
            name: 'PostThawMotility',
            component: () => import('../views/quality-control/PostThawMotility')
        },
        {
            path: '/incubation-test/',
            name: 'IncubationTest',
            component: () => import('../views/quality-control/IncubationTest')
        },
        {
            path: '/sperm-morphology/',
            name: 'SpermMorphology',
            component: () => import('../views/quality-control/SpermMorphology')
        },
        {
            path: '/pia/',
            name: 'PIA',
            component: () => import('../views/quality-control/PIA')
        },
        {
            path: '/sperm-morphology/',
            name: 'SpermMorphology',
            component: () => import('../views/quality-control/SpermMorphology')
        },
        {
            path: '/sperm-concentration-in-Straw/',
            name: 'SpermConcentrationInStraw',
            component: () => import('../views/quality-control/SpermConcentrationInStraw')
        },
        {
            path: '/validation-of-photometer/',
            name: 'ValidationofPhotometer',
            component: () => import('../views/quality-control/ValidationofPhotometer')
        },
        {
            path: '/monitoring-of-semen-quality-under-long-storage/',
            name: 'MonitoringofSemenQualityUnderLongStorage',
            component: () => import('../views/quality-control/MonitoringofSemenQualityUnderLongStorage')
        },
        {
            path: '/microbial-load-of-neat-semen/',
            name: 'MicrobialLoadofNeatSemen',
            component: () => import('../views/quality-control/MicrobialLoadofNeatSemen')
        },
        {
            path: '/testing-Of-ai-sheath-page/',
            name: 'TestingOfAiSheathPage',
            component: () => import('../views/quality-control/TestingOfAiSheathPage')
        },
        {
            path: '/microbial-load-Of-frozen-semen-straw/',
            name: 'MicrobialLoadOfFrozenSemenStraw',
            component: () => import('../views/quality-control/MicrobialLoadOfFrozenSemenStraw')
        },
        {
            path: '/microbial-testing-of-lafu/',
            name: 'MicrobialTestingofLafu',
            component: () => import('../views/quality-control/MicrobialTestingofLafu')
        },
        {
            path: '/microbial-testing-of-av-wash/',
            name: 'MicrobialTestingofAvWash',
            component: () => import('../views/quality-control/MicrobialTestingofAvWash')
        },
        {
            path: '/microbial-load-testing-glassware/',
            name: 'MicrobialLoadTestingGlassWare',
            component: () => import('../views/quality-control/MicrobialLoadTestingGlassWare')
        },
        {
            path: '/testing-of-french-mini-straw/',
            name: 'TestingofFrenchMiniStraw',
            component: () => import('../views/quality-control/TestingofFrenchMiniStraw')
        },
        {
            path: '/calibration-of-equipment/',
            name: 'CalibrationOfEquipment',
            component: () => import('../views/quality-control/CalibrationOfEquipment')
        },
        {
            path: '/semen-evaluation-by-flow-cytometer/',
            name: 'SemenEvaluationByFlowCytometer',
            component: () => import('../views/quality-control/SemenEvaluationByFlowCytometer')
        },
        {
            path: '/semen-evaluation-by-flow-cytometer/:id/details/',
            name: 'SemenEvaluationByFlowCytometerDetailPage',
            component: () => import('../views/quality-control/SemenEvaluationByFlowCytometerDetail')
        },

        // ---------------------general------------------------------
        {
            path: '/observation-page/',
            name: 'ObservationPage',
            component: () => import('../views/general/observation/ObservationPage')
        },
        {
            path: '/observation-page-one/',
            name: 'ObservationOne',
            component: () => import('../views/general/observation/ObservationOne')
        },
        {
            path: '/observation-page-two/',
            name: 'ObservationTwo',
            component: () => import('../views/general/observation/ObservationTwo')
        },
        {
            path: '/observation-page-three/',
            name: 'ObservationThreePage',
            component: () => import('../views/general/observation/ObservationThreePage')
        },
        {
            path: '/milk-feeding/',
            name: 'MilkFeeding',
            component: () => import('../views/general/MilkFeedingPage')
        },
        {
            path: '/stock-register-page-1/',
            name: 'StockRegisterPage',
            component: () => import('../views/general/stock-register/StockRegisterPage1')
        },
        {
            path: '/stock-register-page-2/',
            name: 'StockRegisterPage1',
            component: () => import('../views/general/stock-register/StockRegisterPage2')
        },
        {
            path: '/stock-register-page-3/',
            name: 'StockRegisterPage3',
            component: () => import('../views/general/stock-register/StockRegisterPage3')
        },
        {
            path: '/shed-transfer/',
            name: 'ShedTransfer',
            component: () => import('../views/general/ShedTransfer')
        },
        {
            path: '/general/',
            name: 'General',
            component: () => import('../views/general/General')
        },
        {
            path: '/cow-proposal/',
            name: 'CowProposal',
            component: () => import('../views/general/CowProposal')
        },
        {
            path: '/cow-disposal/',
            name: 'CowDisposal',
            component: () => import('../views/general/CowDisposal')
        },
        {
            path: '/bull-disposal/',
            name: 'BullDisposal',
            component: () => import('../views/general/BullDisposal')
        },
        {
            path: '/animal-disposal-list/',
            name: 'AnimalDisposalList',
            component: () => import('../views/general/AnimalDisposalList')
        },
        {
            path: '/common-components/',
            name: 'Components',
            component: () => import('../views/CommonComponents')
        },
        {
            path: '/bull-proposal/',
            name: 'BullProposal',
            component: () => import('../views/general/BullProposal')
        },
        {
            path: '/animal-proposal-list/',
            name: 'AnimalProposalList',
            component: () => import('../views/general/AnimalProposalList')
        },
        {
            path: '/postmortem-details/',
            name: 'PostmortemDetails',
            component: () => import('../views/general/PostmortemDetails')
        },
        {
            path: '/semen-receipt-storage-add/',
            name: 'SemenReceiptStorageAdd',
            component: () => import('../views/general/semen-receipt/SemenReceiptStorageAdd')
        },
        {
            path: '/semen-receipt/',
            name: 'SemenReceipt',
            component: () => import('../views/general/semen-receipt/SemenReceipt')
        },
        {
            path: '/test-report-chemical/',
            name: 'TestReportChemical',
            component: () => import('../views/general/TestReportOfChemical')
        },
        // ----------------------------FODDER--------------------------------
        {
            path: '/fodder/',
            name: 'Fodder',
            component: () => import('../views/fodder/Fodder')
        },
        {
            path: '/fodder-production/',
            name: 'FodderProduction',
            component: () => import('../views/fodder/FodderProduction')
        },
        {
            path: '/fodder-distribution/',
            name: 'FodderDistribution',
            component: () => import('../views/fodder/FodderDistribution')
        },
        // ------------------------LOGIN------------------------
        {
            path: '/ResetPassword3/',
            name: 'ResetPassword3',
            component: () => import('../views/auth/ResetPassword3')
        },
        {
            path: '/ResetPassword2/',
            name: 'ResetPassword2',
            component: () => import('../views/auth/ResetPassword2')
        },
        {
            path: '/ResetPassword1/',
            name: 'ResetPassword1',
            component: () => import('../views/auth/ResetPassword1')
        },
        {
            path: '/RegisterPage/',
            name: 'RegisterPage',
            component: () => import('../views/auth/RegisterPage')
        },
        // -----------------------USER--------------------------

        {
            path: '/user-list/',
            name: 'UserList',
            component: () => import('../views/user/UserList')
        },

        {
            path: '/home/',
            name: 'Home',
            component: () => import('../views/Home')
        },
        {
            path: '/embryo-transfer/',
            name: 'EmbryoTransfer',
            component: () => import('../views/embryo-transfer/EmbryoTransferSection')
        },
        {
            path: '/quality-of-sub-products/',
            name: 'QualityofSubProducts',
            component: () => import('../views/quality-control/QualityofSubProducts')
        },
        {
            path: '/semen-destruction-proposal/',
            name: 'SemenDestructionProposal',
            component: () => import('../views/bulls/SemenDestructionProposal')
        },
        {
            path: '/semen-destruction-disposal/',
            name: 'SemenDestructionDisposal',
            component: () => import('../views/bulls/SemenDestructionDisposal')
        },
        {
            path: '/bull-disease-screening/',
            name: 'BullDiseaseScreening',
            component: () => import('../views/bulls/BullDiseaseScreening')
        },
        {
            path: '/embryo-transfer-page/',
            name: 'EmbryoTransferPage',
            component: () => import('../views/embryo-transfer/EmbryoTransferPage')
        },
        {
            path: '/embryo-stock/',
            name: 'EmbryoStockPage',
            component: () => import('../views/embryo-transfer/EmbryoStockPage')
        },
        {
            path: '/cow-details/',
            name: 'Details',
            component: () => import('../views/cows/HerdManagement/CowDetails')
        },
        {
            path: '/semen-storage-diagram/',
            name: 'SemenStorageDiagramPage',
            component: () => import('../views/bulls/semen-storage-diagram/SemenStorageDiagramPage')
        },
        {
            path: '/logout/',
            name: 'Logout',
            component: () => import('../views/auth/logout')
        },
        {
            path: '/dashboard/',
            name: 'Dashboard',
            component: () => import('../views/Dashboard')
        },
        {
            path: '/dashboardcard/',
            name: 'DashboardCard',
            component: () => import('../views/common-components/dashboard/DashboardCard')
        },
        {
            path: '/cowsection/',
            name: 'CowDashboard',
            component: () => import('../views/common-components/dashboard/CowDashboard')
        },
        {
            path: '/breeding/',
            name: 'Breeding',
            component: () => import('../views/common-components/dashboard/Breeding')
        },
        {
            path: '/breedingtable/',
            name: 'Breeding',
            component: () => import('../../src/components/BreedingTable')
        },
        {
            path: '/bullproducedtable/',
            name: 'BullProducedTable',
            component: () => import('../../src/components/BullProducedTable')
        },
        {
            path: '/bulltable/',
            name: 'BullTableOne',
            component: () => import('../../src/components/BullTableOne')
        },
        {
            path: '/bulltabletwo/',
            name: 'BullTableTwo',
            component: () => import('../../src/components/BullTableTwo')
        },
        {
            path: '/bulltablethree/',
            name: 'BullTableThree',
            component: () => import('../../src/components/BullTableThree')
        },
        {
            path: '/bulltablefour/',
            name: 'BullTablefour',
            component: () => import('../../src/components/BullTableFour')
        },
        {
            path: '/dashboardcardone/',
            name: 'DashboardCardOne',
            component: () => import('../views/common-components/dashboard/DashboardCardOne')
        },
        {
            path: '/dashboardcard-two/',
            name: 'DashboardCard',
            component: () => import('../views/common-components/dashboard/DashboardCardTwo')
        },
        {
            path: '/bulldashboard/',
            name: 'BullDashboard',
            component: () => import('../views/common-components/dashboard/BullDashboard')
        },
        {
            path: '/bullproduced/',
            name: 'BullProduced',
            component: () => import('../views/common-components/dashboard/BullProduced')
        },
        {
            path: '/semen-quarantine-position-change/',
            name: 'SemenQuarantinePositionChange',
            component: () => import('../views/bulls/SemenQuarantinePositionChange')
        }
    ]
};
