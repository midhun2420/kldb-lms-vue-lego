import guards from './guards';

const Layout = () => import(/* webpackChunkName: "login" */'../layouts/MainLayout');
// const Login = () => import('../views/auth/Login');

export default {
    path: '/',
    name: 'DashboardLayout',
    redirect: '/home/',
    beforeEnter: guards.loggedInGuard,
    component: Layout,
    children: [
        {
            path: '/master-data/',
            name: 'MasterHome',
            component: () => import('../views/MasterData/MasterHome')
        },
        {
            path: '/master-data/animal-type/',
            name: 'animalType',
            component: () => import('../views/MasterData/AnimalType/animalType')
        },
        // {
        //     path: '/master-data/registration-type/',
        //     name: 'registrationType',
        //     component: () => import('../views/MasterData/RegistrationType/registrationType')
        // },
        {
            path: '/master-data/storage-type/',
            name: 'StorageType',
            component: () => import('../views/MasterData/StorageType/StorageType')
        },
        {
            path: '/master-data/source/',
            name: 'Source',
            component: () => import('../views/MasterData/Source/Source')
        },
        {
            path: '/master-data/breed/',
            name: 'Breed',
            component: () => import('../views/MasterData/Breed/Breed')
        },
        {
            path: '/master-data/shed/',
            name: 'Shed',
            component: () => import('../views/MasterData/Shed/Shed')
        },
        {
            path: '/master-data/batch/',
            name: 'Batch',
            component: () => import('../views/MasterData/Batch/Batch')
        },
        {
            path: '/master-data/vaccination-type/',
            name: 'VaccinationType',
            component: () => import('../views/MasterData/VaccinationType/VaccinationType')
        },
        {
            path: '/master-data/location/',
            name: 'Location',
            component: () => import('../views/MasterData/Location/Location')
        },
        {
            path: '/master-data/dehorning-type/',
            name: 'DehorningType',
            component: () => import('../views/MasterData/DehorningType/DehorningType')
        },
        {
            path: '/master-data/group/',
            name: 'Group',
            component: () => import('../views/MasterData/Group/Group')
        },
        {
            path: '/master-data/dose-type/',
            name: 'DoseType',
            component: () => import('../views/MasterData/DoseType/DoseType')
        },
        {
            path: '/master-data/collection/',
            name: 'Collection',
            component: () => import('../views/MasterData/Collection/Collection')
        },
        {
            path: '/master-data/quarantine-location/',
            name: 'QuarantineLocation',
            component: () => import('../views/MasterData/QuarantineLocation/QuarantineLocation')
        },
        {
            path: '/master-data/quarantine-position/',
            name: 'QuarantinePosition',
            component: () => import('../views/MasterData/QuarantinePosition/QuarantinePosition')
        },

        {
            path: '/master-data/disease-type/',
            name: 'DiseaseType',
            component: () => import('../views/MasterData/DiseaseType/DiseaseType')
        },
        {
            path: '/master-data/agency/',
            name: 'Agency',
            component: () => import('../views/MasterData/Agency/Agency')
        },
        {
            path: '/master-data/frequency/',
            name: 'Frequency',
            component: () => import('../views/MasterData/Frequency/Frequency')
        },
        {
            path: '/master-data/course/',
            name: 'Course',
            component: () => import('../views/MasterData/Course/Course')
        },
        {
            path: '/master-data/abnormality/',
            name: 'Abnormality',
            component: () => import('../views/MasterData/Abnormality/Abnormality')
        },
        {
            path: '/master-data/glassware-sample/',
            name: 'GlasswareSample',
            component: () => import('../views/MasterData/GlasswareSample/GlasswareSample')
        },
        {
            path: '/master-data/glassware-volume/',
            name: 'GlasswareVolume',
            component: () => import('../views/MasterData/GlasswareVolume/GlasswareVolume')
        },
        {
            path: '/master-data/equipment/',
            name: 'Equipment',
            component: () => import('../views/MasterData/Equipment/Equipment')
        },
        {
            path: '/master-data/rsb/',
            name: 'Rsb',
            component: () => import('../views/MasterData/Rsb/Rsb')
        },
        {
            path: '/master-data/csb-rooms/',
            name: 'CSB Rooms',
            component: () => import('../views/MasterData/CSBRooms/CSBRooms')
        },
        {
            path: '/master-data/reason-for-culling/',
            name: 'reasonForCulling',
            component: () => import('../views/MasterData/ReasonForCulling/reasonForCulling')
        },
        {
            path: '/master-data/stock-position/',
            name: 'EmbryoStockPosition',
            component: () => import('../views/MasterData/EmbryoStockPosition/EmbryoStockPosition')
        },
        {
            path: '/master-data/mode-of-disposal/',
            name: 'modeOfDisposal',
            component: () => import('../views/MasterData/ModeOfDisposal/modeOfDisposal')
        },
        {
            path: '/master-data/reason-for-disposal/',
            name: 'reasonForDisposal',
            component: () => import('../views/MasterData/ReasonForDisposal/ReasonForDisposal')
        },
        {
            path: '/master-data/unit/',
            name: 'Unit',
            component: () => import('../views/MasterData/Unit/unit')
        },
        {
            path: '/master-data/crop/',
            name: 'Crop',
            component: () => import('../views/MasterData/Crop/crop')
        },
        {
            path: '/master-data/book-value/',
            name: 'BookValue',
            component: () => import('../views/MasterData/BookValue/bookValue')
        },
        {
            path: '/master-data/rejected-reason/',
            name: 'RejectedReason',
            component: () => import('../views/MasterData/RejectedReason/RejectedReason')
        },

        // user management
        {
            path: '/add-user/',
            name: 'AddUser',
            component: () => import('../views/user/AddUser')
        },
        {
            path: '/set-new-password/',
            name: 'SetNewPassword',
            component: () => import('../views/auth/SetNewPasswordPage')
        },
        {
            path: '/master-data/user-list/',
            name: 'UserList',
            component: () => import('../views/user/UserList')
        },
        {
            path: '/master-data/user-activity/',
            name: 'UserActivity',
            component: () => import('../views/auth/DailyActivity')
        },
        {
            path: '/master-data/user-activity/backup/',
            name: 'UserActivityBackup',
            component: () => import('../views/auth/backupComponent')
        }

    ]
};
