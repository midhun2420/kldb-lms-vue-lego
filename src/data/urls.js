const prod = process.env.NODE_ENV === 'production';

let baseUrl;
if (prod) {
    baseUrl = '/api/';
} else {
    baseUrl = '/api/';
}

export default {
    user: {
        userAddEdit: baseUrl + 'auth/user-add-edit/',
        UserList: baseUrl + 'auth/users-list/'
    },
    auth: {
        login: baseUrl + 'auth/login/',
        status: baseUrl + 'auth/status/',
        passwordReset: baseUrl + 'auth/password-reset-view/',
        passwordChange: baseUrl + 'auth/change-password/',
        logout: baseUrl + 'auth/logout/',
        userActivity: baseUrl + 'auth/user-activity-list/',
        logBackUp: baseUrl + 'auth/user-activity-backup/',
        StatusChange: baseUrl + 'auth/user-status-update/',
        ForgotPasswordMailSend: baseUrl + 'auth/forgot-password-email/'

    },
    bulls: {
        addEdit: baseUrl + 'bull/bull-add-edit/',
        list: baseUrl + 'bull/bull-list/',
        delete: baseUrl + 'bull/bull-delete/',
        vueSelect: baseUrl + 'bull/bull-vue-select/',
        allVueSelect: baseUrl + 'bull/all-bull-vue-select/',
        vueSelects: baseUrl + 'bull/bulls-vue-select/',
        details: baseUrl + 'bull/bull-detail/',
        edit: baseUrl + 'bull/bull-profile-edit/',
        imageEdit: baseUrl + 'bull/bull-image-add-edit/',
        sireAutoFetch: baseUrl + 'bull/sire-auto-fetch-farm-born/',
        issueVueselect: baseUrl + 'bull/semen-issue-vue-select/'
    },
    bullDetailEdit: {
        weightrecord: baseUrl + 'bull/bull-weight-record-add-edit/',
        nosePunchingEdit: baseUrl + 'bull/bull-nose-punching-add-edit/',
        dehorningEdit: baseUrl + 'bull/bull-dehorning-add-edit/',
        dewormingEdit: baseUrl + 'bull/bull-deworming-add-edit/',
        vaccinationEdit: baseUrl + 'bull/bull-vaccination-add-edit/',
        screeningEdit: baseUrl + 'bull/bull-screening-add-edit/',
        profileedit: baseUrl + 'bull/bull-profile-edit/',
        weightInfo: baseUrl + 'bull/bull-weight-basic-info/',
        dewormInfo: baseUrl + 'bull/bull-deworming-info/',
        vaccineInfo: baseUrl + 'bull/bull-vaccination-info/',
        screeningInfo: baseUrl + 'bull/bull-screening-info/',
        collectionInfo: baseUrl + 'bull/bull-semen-collection-info/',
        storageInfo: baseUrl + 'bull/bull-semen-storage-info/',
        issueInfo: baseUrl + 'bull/bull-semen-issue-info/',
        disposalInfo: baseUrl + 'bull/bull-semen-disposal-info/'

    },
    cowDetailEdit: {
        weightrecord: baseUrl + 'cow/cow-weight-record-add-edit/',
        nosePunchingEdit: baseUrl + 'cow/cow-nose-punching-add-edit/',
        dehorningEdit: baseUrl + 'cow/cow-dehorning-add-edit/',
        dewormingEdit: baseUrl + 'cow/cow-deworming-add-edit/',
        vaccinationEdit: baseUrl + 'cow/cow-vaccination-add-edit/',
        screeningEdit: baseUrl + 'cow/cow-screening-add-edit/',
        profileEdit: baseUrl + 'cow/cow-profile-edit/',
        weightInfo: baseUrl + 'cow/cow-weight-basic-info/',
        dewormInfo: baseUrl + 'cow/cow-deworming-info/',
        vaccineInfo: baseUrl + 'cow/cow-vaccination-info/',
        screeningInfo: baseUrl + 'cow/cow-screening-info/',
        matingProgramInfo: baseUrl + 'cow/cow-mating-program-info/',
        aiInfo: baseUrl + 'cow/cow-ai-info/',
        pregnancyInfo: baseUrl + 'cow/cow-pregnancy-checkup-info/',
        abortionInfo: baseUrl + 'cow/cow-abortion-info/',
        calvingInfo: baseUrl + 'cow/cow-calving-info/',
        lactationInfo: baseUrl + 'cow/cow-lactation-info/',
        dailyMilkingInfo: baseUrl + 'cow/cow-daily-milking-info/'
    },
    dehorning: {
        addEdit: baseUrl + 'bull/bull-dehorning-add-edit/',
        list: baseUrl + 'bull/bull-dehorning-list/',
        delete: baseUrl + 'bull/bull-dehorning-delete/',
        vueSelect: baseUrl + 'bull/bull-dehorning-vue-select/',
        details: baseUrl + 'bull/bull-dehorning-vue-select/',
        bullVueSelect: baseUrl + 'bull/dehorning-bull-vue-select/'
    },
    deworming: {
        addEdit: baseUrl + 'bull/bull-deworming-add-edit/',
        list: baseUrl + 'bull/bull-deworming-list/',
        delete: baseUrl + 'bull/bull-deworming-delete/',
        vueSelect: baseUrl + 'bull/bull-deworming-vue-select/',
        details: baseUrl + 'bull/bull-deworming-detail/'
    },
    nosePunching: {
        addEdit: baseUrl + 'bull/bull-nose-punching-add-edit/',
        list: baseUrl + 'bull/bull-nose-punching-list/',
        delete: baseUrl + 'bull/bull-nose-punching-delete/',
        vueSelect: baseUrl + 'bull/bull-nose-punching-vue-select/',
        details: baseUrl + 'bull/bull-nose-punching-detail/',
        animalVueSelect: baseUrl + 'bull/nose-punching-bull-vue-select/'
    },
    weightRecord: {
        addEdit: baseUrl + 'bull/bull-weight-record-add-edit/',
        list: baseUrl + 'bull/bull-weight-record-list/',
        delete: baseUrl + 'bull/bull-weight-record-delete/',
        vueSelect: baseUrl + 'bull/bull-weight-record-vue-select/',
        details: baseUrl + 'bull/bull-nose-weight-record-detail/',
        bullVueSelect: baseUrl + 'bull/weight-record-bull-vue-select/'
    },
    vaccination: {
        addEdit: baseUrl + 'bull/bull-vaccination-add-edit/',
        list: baseUrl + 'bull/bull-vaccination-list/',
        delete: baseUrl + 'bull/bull-vaccination-delete/',
        vueSelect: baseUrl + 'bull/bull-vaccination-vue-select/',
        details: baseUrl + 'bull/bull-vaccination-detail/',
        animalSelect: baseUrl + 'bull/vaccination-animal-vue-select/'
    },
    diseaseScreening: {
        addEdit: baseUrl + 'bull/bull-screening-add-edit/',
        list: baseUrl + 'bull/bull-screening-list/',
        delete: baseUrl + 'bull/bull-screening-delete/',
        vueSelect: baseUrl + 'bull/bull-screening-vue-select/',
        details: baseUrl + 'bull/bull-screening-detail/'
    },
    semenDestructionProposal: {
        addEdit: baseUrl + 'bull/bull-semen-proposal-add-edit/',
        list: baseUrl + 'bull/bull-semen-proposal-list/',
        delete: baseUrl + 'bull/bull-semen-proposal-delete/',
        vueSelect: baseUrl + 'bull/bull-semen-proposal-vue-select/',
        details: baseUrl + 'bull/bull-semen-proposal-detail/',
        storageDetails: baseUrl + 'bull/bull-semen-proposal-storage-detail/',
        downloadReport: baseUrl + 'bull/bull-semen-proposal-excel/'

    },
    semenDestructionDisposal: {
        addEdit: baseUrl + 'bull/bull-semen-disposal-add-edit/',
        list: baseUrl + 'bull/bull-semen-disposal-list/',
        delete: baseUrl + 'bull/bull-semen-disposal-delete/',
        vueSelect: baseUrl + 'bull/bull-semen-disposal-vue-select/',
        details: baseUrl + 'bull/bull-semen-disposal-detail/',
        pendingList: baseUrl + 'bull/bull-semen-disposal-pending-list/',
        downloadReport: baseUrl + 'bull/bull-semen-disposal-excel/'
    },
    calfSelection: {
        addEdit: baseUrl + 'bull/bull-calf-selection-add/',
        list: baseUrl + 'bull/bull-calf-selection-list/',
        delete: baseUrl + 'bull/bull-calf-selection-delete/',
        vueSelect: baseUrl + 'bull/bull-calf-selection-vue-select/',
        details: baseUrl + 'bull/bull-calf-selection-detail/',
        calfAnimalVueSelect: baseUrl + 'bull/calf-animal-vue-select/',
        calfDueForSelectionList: baseUrl + 'bull/calf-due-selection-list/',
        BullCalfQuarantineMonthUpdate: baseUrl + 'bull/calf-quarantine-month-update/',
        selectedBullsList: baseUrl + 'bull/calf-selected-bull-select/',
        quarantineDetailsSave: baseUrl + 'bull/calf-quarantine-month-update/'
    },
    collectionSchedule: {
        addEdit: baseUrl + 'bull/collection-schedule/add-edit/',
        list: baseUrl + 'bull/bull-collection-schedule-list/',
        scheduleList: baseUrl + 'bull/collection-schedule/list/',
        delete: baseUrl + 'bull/bull-collection-schedule-delete/',
        vueSelect: baseUrl + 'bull/bull-collection-schedule-vue-select/',
        details: baseUrl + 'bull/bull-collection-schedule-detail/',
        collectionBulls: baseUrl + 'bull/collection-schedule/animal-vue-select/',
        batchList: baseUrl + 'bull/collection-schedule/batch-wise-bull-list/',
        report: baseUrl + 'bull/collection-schedule/download/'
    },
    regularization: {
        addEdit: baseUrl + 'bull/bull-regularization-add-edit/',
        edit: baseUrl + 'bull/bull-regularization-edit/',
        list: baseUrl + 'bull/bull-regularization-list/',
        delete: baseUrl + 'bull/bull-regularization-delete/',
        vueSelect: baseUrl + 'bull/bull-regularization-vue-select/',
        details: baseUrl + 'bull/bull-regularization-detail/',
        selectedBulls: baseUrl + 'bull/regularization-animal-vue-select/',
        selectedBullsList: baseUrl + 'bull/regularization-due-selection-list/'

    },
    quarantine: {
        addEdit: baseUrl + 'bull/quarantine/add-edit/',
        list: baseUrl + 'bull/quarantine/list/',
        delete: baseUrl + 'bull/bull-quarantine-delete/',
        vueSelect: baseUrl + 'bull/bull-quarantine-vue-select/',
        details: baseUrl + 'bull/quarantine/detail/',
        animalsVueSelect: baseUrl + 'bull/quarantine-animal/vue-select/',
        quarantineBullVueSelect: baseUrl + 'bull/quarantine/bull-vue-select/',
        quarantineBullDetails: baseUrl + 'bull/quarantine/detail/',
        chamberSelect: baseUrl + 'bull/chamber-vue-select/',
        gobletSelect: baseUrl + 'bull/goblet-vue-select/',
        canisterSelect: baseUrl + 'bull/canister-vue-select/'
    },
    virtualDespatching: {
        addEdit: baseUrl + 'bull/virtual-despatch/add-edit/',
        list: baseUrl + 'bull/virtual-despatch/list/',
        delete: baseUrl + 'bull/virtual-despatch/delete/',
        vueSelect: baseUrl + 'bull/virtual-despatch/vue-select/',
        details: baseUrl + 'bull/virtual-despatch/detail/',
        DespatchList: baseUrl + 'bull/virtual-despatch/quarantine-list/',
        DespatchPendingList: baseUrl + 'bull/virtual-despatch/pending-list/',
        downloadReport: baseUrl + 'bull/virtual-despatch/test-pdf/',
        RSBVUeSelect: baseUrl + 'bull/virtual-despatch/rsb-vue-select/'

    },
    semenIssue: {
        addEdit: baseUrl + 'bull/semen-issue/add-edit/',
        list: baseUrl + 'bull/bull-semen-issue-list/',
        delete: baseUrl + 'bull/bull-semen-issue-delete/',
        vueSelect: baseUrl + 'bull/bull-semen-issue-vue-select/',
        details: baseUrl + 'bull/bull-semen-issue-detail/',
        BullDetails: baseUrl + 'bull/semen-issue/dose-list/'
    },
    semenCollection: {
        addEdit: baseUrl + 'bull/semen-collection/animal-create/',
        addedit: baseUrl + 'bull/semen-collection/add-edit/',
        list: baseUrl + 'bull/semen-collection/list/',
        delete: baseUrl + 'bull/bull-semen-collection-delete/',
        vueSelect: baseUrl + 'bull/bull-semen-collection-vue-select/',
        details: baseUrl + 'bull/semen-collection/detail/',
        pendingAnimal: baseUrl + 'bull/semen-collection/pending-animal-list/',
        animalEdit: baseUrl + 'bull/semen-collection/animal-edit/',
        listAnimal: baseUrl + 'bull/semen-collection/animal-list/',
        Upload: baseUrl + 'bull/semen-collection/upload-create/',
        bullDetails: baseUrl + 'bull/semen-collection/pending-animal-detail/',
        animalDetails: baseUrl + 'bull/semen-collection/animal-detail/'

    },
    clubbingofSemenDose: {
        addEdit: baseUrl + 'bull/semen-dose-clubbing/add-edit/',
        list: baseUrl + 'bull/semen-dose-clubbing/list/',
        delete: baseUrl + 'bull/semen-dose-clubbing/delete/',
        // vueSelect: baseUrl + '',
        details: baseUrl + 'bull/semen-dose-clubbing/detail/',
        pendingList: baseUrl + 'bull/semen-dose-clubbing/pending-list/',
        vueSelect: baseUrl + 'bull/semen-clubbing-bull/vue-select/'
    },
    semenQuarantine: {
        addEdit: baseUrl + 'bull/semen-quarantine/add-edit/',
        positionChange: baseUrl + 'bull/semen-quarantine/position-change-add-edit/',
        list: baseUrl + 'bull/semen-quarantine/list/',
        delete: baseUrl + 'bull/semen-quarantine/delete/',
        vueSelect: baseUrl + 'bull/bull-nose-punching-vue-select/',
        details: baseUrl + 'bull/semen-quarantine/detail/',
        PendingListView: baseUrl + 'bull/semen-quarantine/pending-bull-list/'
    },

    cows: {
        detailEdit: baseUrl + 'cow/cow-profile-edit/',
        addEdit: baseUrl + 'cow/cow-add-edit/',
        list: baseUrl + 'cow/cow-list/',
        delete: baseUrl + 'cow/cow-delete/',
        vueSelect: baseUrl + 'cow/cow-vue-select/',
        allVueSelect: baseUrl + 'cow/all-cow-vue-select/',
        dateofBirth: baseUrl + 'cow/cow-date-of-birth-vue-select/',
        details: baseUrl + 'cow/cow-detail/',
        cowTypeSelect: baseUrl + 'cow/cow-type-vue-select/',
        imageEdit: baseUrl + 'cow/cow-image-add-edit/'
    },
    cowNosePunching: {
        addEdit: baseUrl + 'cow/cow-nose-punching-add-edit/',
        list: baseUrl + 'cow/cow-nose-punching-list/',
        delete: baseUrl + 'cow/cow-nose-punching-delete/',
        vueSelect: baseUrl + 'cow/cow-nose-punching-vue-select/',
        details: baseUrl + 'cow/cow-nose-punching-detail/',
        animalVueSelect: baseUrl + 'cow/nose-punching-cow-vue-select/'
    },
    cowDehorning: {
        addEdit: baseUrl + 'cow/cow-dehorning-add-edit/',
        list: baseUrl + 'cow/cow-dehorning-list/',
        delete: baseUrl + 'cow/cow-dehorning-delete/',
        vueSelect: baseUrl + 'cow/cow-vue-select/',
        details: baseUrl + 'cow/cow-dehorning-detail/',
        cowVueSelect: baseUrl + 'cow/dehorning-cow-vue-select/'
    },
    cowDeworming: {
        addEdit: baseUrl + 'cow/cow-deworming-add-edit/',
        list: baseUrl + 'cow/cow-deworming-list/',
        delete: baseUrl + 'cow/cow-deworming-delete/',
        vueSelect: baseUrl + '/cow/cow-deworming-vue-select/',
        details: baseUrl + 'cow/cow-deworming-detail/'
    },
    cowVaccination: {
        addEdit: baseUrl + 'cow/cow-vaccination-add-edit/',
        list: baseUrl + 'cow/cow-vaccination-list/',
        delete: baseUrl + 'cow/cow-vaccination-delete/',
        vueSelect: baseUrl + '/cow/cow-vaccination-vue-select/',
        details: baseUrl + 'cow/cow-vaccination-detail/'
    },
    cowWeightRecord: {
        addEdit: baseUrl + 'cow/cow-weight-record-add-edit/',
        list: baseUrl + 'cow/cow-weight-record-list/',
        delete: baseUrl + 'cow/cow-weight-record-delete/',
        vueSelect: baseUrl + '/cow/cow-weight-record-vue-select/',
        details: baseUrl + 'cow/cow-weight-record-detail/',
        cowVueSelect: baseUrl + 'cow/weight-recording-cow-vue-select/'
    },
    cowScreening: {
        addEdit: baseUrl + 'cow/cow-screening-add-edit/',
        list: baseUrl + 'cow/cow-screening-list/',
        delete: baseUrl + 'cow/cow-screening-delete/',
        vueSelect: baseUrl + '/cow/cow-screeningvue-select/',
        details: baseUrl + 'cow/cow-screening-detail/',
        loadCows: baseUrl + 'cow/cow-screening-cow-detail/'
    },
    mating_program: {
        addEdit: baseUrl + 'cow/cow-mating-program-add-edit/',
        list: baseUrl + 'cow/cow-mating-program-list/',
        delete: baseUrl + 'cow/cow-mating-program-delete/',
        vueSelect: baseUrl + '/cow/cow-mating-program-vue-select/',
        details: baseUrl + 'cow/cow-mating-program-detail/',
        allOptions: baseUrl + 'cow/cow-mating-program-all-options/',
        bullVueSelect: baseUrl + 'cow/mating-program-bull-vue-select/'

    },
    abortion_event: {
        addEdit: baseUrl + 'cow/cow-abortion-event-add-edit/',
        list: baseUrl + 'cow/cow-abortion-event-list/',
        delete: baseUrl + 'cow/cow-abortion-event-delete/',
        vueSelect: baseUrl + 'cow/cow-abortion-event-vue-select/',
        details: baseUrl + 'cow/cow-abortion-event-detail/',
        cowDetails: baseUrl + 'cow/cow-abortion-event-cow-details/'
    },
    calving_details: {
        addEdit: baseUrl + 'cow/cow-calving-details-add-edit/',
        list: baseUrl + 'cow/cow-calving-details-list/',
        delete: baseUrl + 'cow/cow-calving-details-delete/',
        vueSelect: baseUrl + 'cow/cow-calving-details-vue-select/',
        details: baseUrl + 'cow/cow-calving-details-detail/',
        cowDetails: baseUrl + 'cow/cow-calving-details-cow-details/'
    },
    artificial_insemination: {
        addEdit: baseUrl + 'cow/cow-artificial-insemination-add-edit/',
        list: baseUrl + 'cow/cow-artificial-insemination-list/',
        delete: baseUrl + 'cow/cow-artificial-insemination-delete/',
        vueSelect: baseUrl + 'cow/cow-artificial-insemination-vue-select/',
        details: baseUrl + 'cow/cow-artificial-insemination-detail/',
        cowDetails: baseUrl + 'cow/cow-artificial-insemination-cow-details/',
        cowVueSelect: baseUrl + 'cow/cow-artificial-insemination-cow-vue-select/',
        cowAIVueSelect: baseUrl + 'cow/cow-artificial-pregnancy-vue-select/',
        activeMating: baseUrl + 'cow/cow-active-mating-program-list/'
    },
    daily_milk_recording: {
        addEdit: baseUrl + 'cow/cow-milk-record-add-edit/',
        list: baseUrl + 'cow/cow-milk-record-list/',
        recordList: baseUrl + 'cow/cow-milk-list/',
        delete: baseUrl + 'cow/cow-milk-record-delete/',
        vueSelect: baseUrl + 'cow/cow-milk-record-vue-select/',
        details: baseUrl + 'cow/cow-milk-record-detail/',
        cowDetails: baseUrl + 'cow/cow-milk-record-cow-details/',
        excelUpload: baseUrl + 'cow/cow-excel-reader/',
        loadAfterSave: baseUrl + 'cow/cow-milk-record-after-save/'
    },
    pregnancy_checkup: {
        addEdit: baseUrl + 'cow/cow-pregnancy-checkup-add-edit/',
        list: baseUrl + 'cow/cow-pregnancy-checkup-list/',
        delete: baseUrl + 'cow/cow-pregnancy-checkup-delete/',
        vueSelect: baseUrl + 'cow/cow-pregnancy-checkup-vue-select/',
        details: baseUrl + 'cow/cow-pregnancy-checkup-detail/',
        cowDetails: baseUrl + 'cow/cow-pregnancy-checkup-cow-detail/',
        pregnancyCheckupReport: baseUrl + 'cow/cow-pregnancy-checkup-due-report-download/'
    },
    cowLactationStatus: {
        addEdit: baseUrl + 'cow/cow-lactation-status-add-edit/',
        list: baseUrl + 'cow/cow-lactation-status-list/',
        delete: baseUrl + 'cow/cow-lactation-status-delete/',
        allOptions: baseUrl + 'cow/cow-lactation-status-cow-detail/',
        details: baseUrl + 'cow/cow-lactation-status-detail/'
    },
    cowMilkDisposal: {
        addEdit: baseUrl + 'cow/cow-milk-disposal-add-edit/',
        list: baseUrl + 'cow/cow-milk-disposal-list/',
        delete: baseUrl + 'cow/cow-milk-disposal-delete/',
        details: baseUrl + 'cow/cow-milk-disposal-detail/'
    },
    fodder_production: {
        addEdit: baseUrl + 'fodder/fodder-production-add-edit/',
        list: baseUrl + 'fodder/fodder-production-list/',
        delete: baseUrl + 'fodder/fodder-production-delete/',
        vueSelect: baseUrl + 'fodder/fodder-production-vue-select/',
        details: baseUrl + 'fodder/fodder-production-detail/'
    },
    fodder_distribution: {
        addEdit: baseUrl + 'fodder/fodder-distribution-add-edit/',
        list: baseUrl + 'fodder/fodder-distribution-list/',
        delete: baseUrl + 'fodder/fodder-distribution-delete/',
        vueSelect: baseUrl + 'fodder/fodder-distribution-vue-select/',
        details: baseUrl + 'fodder/fodder-distribution-detail/'
    },
    embryoStock: {
        addEdit: baseUrl + 'embryo/embryo-stock-add-edit/',
        list: baseUrl + 'embryo/embryo-stock-list/',
        delete: baseUrl + 'embryo/embryo-stock-delete/',
        details: baseUrl + 'embryo/embryo-stock-detail/',
        recipientNoOption: baseUrl + 'embryo/embryo-stock-detail/',
        vueSelect: baseUrl + 'embryo/embryo-stock-vue-select/',
        embryoNoDetails: baseUrl + 'embryo/embryo-stock-embryo-no-detail/',
        damDetails: baseUrl + 'embryo/embryo-stock-dam-details/',
        sireDetails: baseUrl + 'embryo/embryo-stock-sire-details/'
    },
    embryoTransfer: {
        addEdit: baseUrl + 'embryo/embryo-transfer-add-edit/',
        list: baseUrl + 'embryo/embryo-transfer-list/',
        delete: baseUrl + 'embryo/embryo-transfer-delete/',
        details: baseUrl + 'embryo/embryo-transfer-detail/',
        vueSelect: baseUrl + 'embryo/embryo-transfer-vue-select/',
        embryoNoSelect: baseUrl + 'embryo/embryo-no-select/',
        embryoNoDetail: baseUrl + 'embryo/embryo-stock-embryo-no-detail/'
    },
    proposal: {
        addEdit: baseUrl + 'general/proposal/add-edit/',
        list: baseUrl + 'general/proposal/list/',
        delete: baseUrl + 'general/proposal/delete/',
        animalDetail: baseUrl + 'general/proposal/animal-detail/',
        details: baseUrl + 'general/proposal/detail/',
        loadAnimal: baseUrl + 'general/proposal/load-animal/'
    },
    disposal: {
        addEdit: baseUrl + 'general/disposal/add-edit/',
        list: baseUrl + 'general/disposal/list/',
        delete: baseUrl + 'general/disposal/delete/',
        animalDetail: baseUrl + 'general/disposal/animal-detail/',
        details: baseUrl + 'general/disposal/detail/',
        loadAnimal: baseUrl + 'general/disposal/load-animal/'
    },
    post_mortem: {
        addEdit: baseUrl + 'general/post-mortem/add-edit/',
        list: baseUrl + 'general/post-mortem/list/',
        delete: baseUrl + 'general/post-mortem/delete/',
        animalDetail: baseUrl + 'general/post-mortem/animal-detail/',
        details: baseUrl + 'general/post-mortem/detail/',
        loadAnimal: baseUrl + 'general/post-mortem/animal-vue-select/'
    },
    semen_storage: {
        addEdit: baseUrl + 'general/semen-storage/add-edit/',
        list: baseUrl + 'general/semen-storage/list/',
        delete: baseUrl + 'general/semen-storage/delete/',
        details: baseUrl + 'general/semen-storage/detail/',
        getData: baseUrl + 'bull/semen-quarantine/jumbo-location/',
        getCountData: baseUrl + 'bull/semen-quarantine/jumbo-location-count/',
        getOMRData: baseUrl + 'bull/semen-quarantine/omr-location/',
        getOMRCountData: baseUrl + 'bull/semen-quarantine/omr-location-count/'
    },
    semen_receipt: {
        addEdit: baseUrl + 'general/semen-receipt/add-edit/',
        list: baseUrl + 'general/semen-receipt/list/',
        delete: baseUrl + 'general/semen-receipt/delete/',
        details: baseUrl + 'general/semen-receipt/detail/',
        vueSelect: baseUrl + 'general/semen-receipt/vue-select/'
    },
    observation: {
        addEdit: baseUrl + 'general/observation/add-edit/',
        list: baseUrl + 'general/observation/list/',
        delete: baseUrl + 'general/observation/delete/',
        details: baseUrl + 'general/observation/detail/',
        animalVueSelect: baseUrl + 'general/observation/animal-vue-select/'
    },
    milk_feeding: {
        addEdit: baseUrl + 'general/milk-feeding/add-edit/',
        list: baseUrl + 'general/milk-feeding/list',
        delete: baseUrl + 'general/milk-feeding/delete/',
        details: baseUrl + 'general/milk-feeding/detail/',
        findTotal: baseUrl + 'general/milk-feeding/milk-total/',
        animalDetail: baseUrl + 'general/milk-feeding/animal-detail/'
    },
    shed_transfer: {
        addEdit: baseUrl + 'general/shed-transfer/add-edit/',
        list: baseUrl + 'general/shed-transfer/list/',
        delete: baseUrl + 'general/shed-transfer/delete/',
        details: baseUrl + 'general/shed-transfer/detail/',
        animalDetail: baseUrl + 'general/shed-transfer/animal-detail/'
    },
    stock_register: {
        addEdit: baseUrl + 'general/stock-register/add-edit/',
        list: baseUrl + 'general/stock-register/list/',
        delete: baseUrl + 'general/stock-register/delete/',
        details: baseUrl + 'general/stock-register/detail/'
    },
    trainingCenter: {
        addEdit: baseUrl + 'general/training-center/add-edit/',
        list: baseUrl + 'general/training-center/list/',
        delete: baseUrl + 'general/training-center/delete/',
        details: baseUrl + 'general/training-center/detail/',
        excludeCountry: baseUrl + 'general/location-country-view-select/',
        excludeState: baseUrl + 'general/location-state-view-select/'
    },
    post_thaw_motility: {
        addEdit: baseUrl + 'quality-control/post-thaw-motility/add-edit/',
        list: baseUrl + 'quality-control/post-thaw-motility/list/',
        delete: baseUrl + 'quality-control/post-thaw-motility/delete/',
        details: baseUrl + 'quality-control/post-thaw-motility/detail/',
        collectionDetails: baseUrl + 'quality-control/post-thaw-motility/collection-list/',
        savedCollectionDetails: baseUrl + 'quality-control/post-thaw-motility-saved/collection-list/',
        getDose: baseUrl + 'quality-control/post-thaw-motility-ptm/detail/'

    },
    incubation_test: {
        addEdit: baseUrl + 'quality-control/incubation-test-add-edit/',
        list: baseUrl + 'quality-control/incubation-test-list/',
        delete: baseUrl + 'quality-control/incubation-test-delete/',
        details: baseUrl + 'quality-control/incubation-test-detail/',
        collectionDetails: baseUrl + 'quality-control/incubation-test-collection-list/'
    },
    pia: {
        addEdit: baseUrl + 'quality-control/pia-add-edit/',
        list: baseUrl + 'quality-control/pia-list/',
        delete: baseUrl + 'quality-control/pia-delete/',
        details: baseUrl + 'quality-control/pia-detail/'
    },
    sperm_morphology: {
        addEdit: baseUrl + 'quality-control/sperm-morphology-add-edit/',
        list: baseUrl + 'quality-control/sperm-morphology-list/',
        delete: baseUrl + 'quality-control/sperm-morphology-delete/',
        details: baseUrl + 'quality-control/sperm-morphology-detail/',
        collectionBulls: baseUrl + 'quality-control/sperm-morphology-collection-bulls/',
        collectionBullDetails: baseUrl + 'quality-control/sperm-morphology-collection-bull-detail/'
    },
    sperm_concentration: {
        addEdit: baseUrl + 'quality-control/sperm-concentration-add-edit/',
        list: baseUrl + 'quality-control/sperm-concentration-list/',
        delete: baseUrl + 'quality-control/sperm-concentration-delete/',
        details: baseUrl + 'quality-control/sperm-concentration-detail/',
        loadResult: baseUrl + 'quality-control/sperm-concentration-results/'
    },
    semen_quality: {
        addEdit: baseUrl + 'quality-control/semen-quality-add-edit/',
        list: baseUrl + 'quality-control/semen-quality-list/',
        delete: baseUrl + 'quality-control/semen-quality-delete/',
        details: baseUrl + 'quality-control/semen-quality-detail/'
    },
    air_culture: {
        addEdit: baseUrl + 'quality-control/air-culture-add-edit/',
        list: baseUrl + 'quality-control/air-culture-list/',
        delete: baseUrl + 'quality-control/air-culture-delete/',
        details: baseUrl + 'quality-control/air-culture-detail/',
        locations: baseUrl + 'master-data/csb-room-vue-select/'
    },
    chemical_test: {
        // bullAddEdit: baseUrl + 'quality-control/bull-chemical-test-add-edit/',
        addEdit: baseUrl + 'quality-control/chemical-test-add-edit/',
        list: baseUrl + 'quality-control/chemical-test-list/',
        delete: baseUrl + 'quality-control/chemical-test-delete/',
        details: baseUrl + 'quality-control/chemical-test-detail/'
    },
    semen_evaluation_cytometer: {
        addEdit: baseUrl + 'quality-control/semen-evaluation-cytometer-add-edit/',
        list: baseUrl + 'quality-control/semen-evaluation-cytometer-list/',
        delete: baseUrl + 'quality-control/semen-evaluation-cytometer-delete/',
        details: baseUrl + 'quality-control/semen-evaluation-cytometer-detail/'
    },
    subproducts_quality: {
        addEdit: baseUrl + 'quality-control/subproducts-quality-add-edit/',
        list: baseUrl + 'quality-control/subproducts-quality-list/',
        delete: baseUrl + 'quality-control/subproducts-quality-delete/',
        details: baseUrl + 'quality-control/subproducts-quality-detail/'
    },
    semen_microbial_load_neat: {
        addEdit: baseUrl + 'quality-control/semen-microbial-load-neat-add-edit/',
        list: baseUrl + 'quality-control/semen-microbial-load-neat-list/',
        delete: baseUrl + 'quality-control/semen-microbial-load-neat-delete/',
        details: baseUrl + 'quality-control/semen-microbial-load-neat-detail/',
        loadResult: baseUrl + 'quality-control/semen-microbial-load-result/',
        collectionDetails: baseUrl + 'quality-control/semen-microbial-load-collection/'
    },
    semen_microbial_load_frozen: {
        addEdit: baseUrl + 'quality-control/semen-microbial-load-frozen-add-edit/',
        list: baseUrl + 'quality-control/semen-microbial-load-frozen-list/',
        delete: baseUrl + 'quality-control/semen-microbial-load-frozen-delete/',
        details: baseUrl + 'quality-control/semen-microbial-load-frozen-detail/'
    },
    photometer_validation: {
        addEdit: baseUrl + 'quality-control/photometer-validation-add-edit/',
        list: baseUrl + 'quality-control/photometer-validation-list/',
        delete: baseUrl + 'quality-control/photometer-validation-delete/',
        details: baseUrl + 'quality-control/photometer-validation-detail/',
        loadResult: baseUrl + 'quality-control/photometer-validation-results/'
    },
    host_test: {
        addEdit: baseUrl + 'quality-control/host-test-add-edit/',
        list: baseUrl + 'quality-control/host-test-list/',
        delete: baseUrl + 'quality-control/host-test-delete/',
        details: baseUrl + 'quality-control/host-test-detail/'
    },
    wash_test: {
        addEdit: baseUrl + 'quality-control/wash-test-add-edit/',
        list: baseUrl + 'quality-control/wash-test-list/',
        delete: baseUrl + 'quality-control/wash-test-delete/',
        details: baseUrl + 'quality-control/wash-test-detail/'
    },
    lafu_test: {
        addEdit: baseUrl + 'quality-control/lafu-test-add-edit/',
        list: baseUrl + 'quality-control/lafu-test-list/',
        delete: baseUrl + 'quality-control/lafu-test-delete/',
        details: baseUrl + 'quality-control/lafu-test-detail/'
    },
    glasswares_test: {
        addEdit: baseUrl + 'quality-control/glasswares-test-add-edit/',
        list: baseUrl + 'quality-control/glasswares-test-list/',
        delete: baseUrl + 'quality-control/glasswares-test-delete/',
        details: baseUrl + 'quality-control/glasswares-test-detail/'
    },
    equipment_calibration: {
        addEdit: baseUrl + 'quality-control/equipment-calibration-add-edit/',
        list: baseUrl + 'quality-control/equipment-calibration-list/',
        delete: baseUrl + 'quality-control/equipment-calibration-delete/',
        details: baseUrl + 'quality-control/equipment-calibration-detail/',
        lastDetails: baseUrl + 'quality-control/equipment-calibration-last-detail/'
    },
    french_mini_straw: {
        addEdit: baseUrl + 'quality-control/french-mini-straw-add-edit/',
        list: baseUrl + 'quality-control/french-mini-straw-list/',
        delete: baseUrl + 'quality-control/french-mini-straw-delete/',
        details: baseUrl + 'quality-control/french-mini-straw-detail/'
    },
    aisheath_test: {
        addEdit: baseUrl + 'quality-control/aisheath-test-add-edit/',
        list: baseUrl + 'quality-control/aisheath-test-list/',
        delete: baseUrl + 'quality-control/aisheath-test-delete/',
        details: baseUrl + 'quality-control/aisheath-test-detail/'
    },
    bullDetails: {
        bullDetailsDetail: baseUrl + 'bull/bull-profile-detail/',
        bullBasicInfoDetail: baseUrl + 'bull/bull-profile-basic-detail/',
        bullMedicalInfoDetail: baseUrl + 'bull/bull-profile-medical-detail/',
        bullSemenInfoDetail: baseUrl + 'bull/bull-profile-semen-detail/'
    },
    cowDetails: {
        cowDetails: baseUrl + 'cow/cow-details-detail/',
        basicDetail: baseUrl + 'cow/cow-basic-detail/',
        medicalDetail: baseUrl + 'cow/cow-medical-detail/',
        lactationDetail: baseUrl + 'cow/cow-lactation-detail/',
        pregnancyDetail: baseUrl + 'cow/cow-pregnancy-detail/'
    },
    sireDamDetails: {
        sireVueSelect: baseUrl + 'bull/sire-vue-select/',
        damVueSelect: baseUrl + 'cow/dam-vue-select/'
    },

    // Reports Section //

    reports: {
        bulls: {
            individualReport: baseUrl + 'reports/individual-bull-report/',
            individualBullDetails: baseUrl + 'reports/individual_bull_details/',
            bullSearch: baseUrl + 'reports/bull-count-report/',
            above18Months: baseUrl + 'reports/bulls-above-18months/',
            below18Months: baseUrl + 'reports/bulls-below-18months/',
            additionToUnit: baseUrl + 'reports/bull-addition-date-report/',
            bornBetweenTwoDates: baseUrl + 'reports/bull-birth-date-report/',
            livestockSummary: baseUrl + 'reports/bull-summary-report/',
            livestockSummaryYoungBull: baseUrl + 'reports/young-bull-summary-report/',

            regNoAbove18Months: baseUrl + 'reports/bull-18above-regno-select/',
            renumberAbove18Months: baseUrl + 'reports/bull-18above-reno-select/',

            dehorningBetweenTwoDates: baseUrl + 'reports/bull-dehorning-between_dates-report/',
            dehorningLimitCrossed: baseUrl + 'reports/bull-dehorning-limit-cross-report/',
            dueForDehorning: baseUrl + 'reports/bull-dehorning-due-report/',
            nosePunchingBetweenTwoDates: baseUrl + 'reports/bull-nose_punching-report/',
            dueForNosePunching: baseUrl + 'reports/bull-nose_punching-due-report/',
            weightRecordingBetweenTwoDates: baseUrl + 'reports/bull-weight-recording-report/',
            weightGainBetweenTwoDates: baseUrl + 'reports/bull-individual-weight-gain-report/',
            averageWeightGainBetweenTwoDates: baseUrl + 'reports/bull-average-weight-gain-report/',
            detailsOfWeightRecorded: baseUrl + 'reports/bull-shed-weight-gain-report/',
            weightGainOfTwoBreeds: baseUrl + 'reports/bull-breed-weight-gain-report/',
            weightGainOfTwoGroup: baseUrl + 'reports/bull-age-group-weight-gain-report/',
            weightGainOfTwoSource: baseUrl + 'reports/bull-source-weight-gain-report/',
            observation: baseUrl + 'reports/bull-observation-report/',
            shedWiseDeworming: baseUrl + 'reports/bull-deworming/shedwise-list/',

            bullsSemenProductionSummary: baseUrl + 'reports/bull-semen-collection-report/production-summary/',
            bullsBreedWiseSemenCollection: baseUrl + 'reports/bull-semen-collection-report/breed-wise/',
            bullsGroupWiseSemenCollection: baseUrl + 'reports/bull-semen-collection-report/group-wise/',
            bullsIndividualSemenCollection: baseUrl + 'reports/bull-semen-collection-individual-report/',
            bullsDailyProduction: baseUrl + 'reports/bull-daily-semen-production-report/',
            bullSemenStorage: baseUrl + 'reports/semen-storage-individual-report/',
            bullLocationWiseSemenStorage: baseUrl + 'reports/bull-location-wise-semen-report/',
            bullDamsYieldWiseSemenStorage: baseUrl + 'reports/bull-dams-yield-wise-stock-report/',
            bullLocationSemenStorageDisplay: baseUrl + 'reports/bull-storage-wise-stock-report/',
            bullsProductionDateSemenStorage: baseUrl + 'reports/bull-semen-production-date-wise-report/',
            bullSemenDespatch: baseUrl + 'reports/bull-semen-despatch-rsb-wise-report/',
            bullWiseSemenDespatch: baseUrl + 'reports/bull-number-wise-semen-despatch-report/',
            bullSemenIssue: baseUrl + 'reports/bull-semen-issued-to-rsb-report/',
            bullSemenDisposal: baseUrl + 'reports/bull-semen-disposal/',
            bullSemenProposal: baseUrl + 'reports/bull-semen-proposal/',
            bullWiseSemenStock: baseUrl + 'reports/bull-wise-semen-stock-report/',
            bullBreedWiseSemenStock: baseUrl + 'reports/bull-breed-wise-stock-report/',
            bullGroupWiseSemenStock: baseUrl + 'reports/bull-group-wise-stock-report/',
            bullDeletion: baseUrl + 'reports/bull-deletion-report/',
            bullAvgAgeFirstCollection: baseUrl + 'reports/bull-average-age-first-collection-report/',
            bullsSemenRejection: baseUrl + 'reports/bull-semen-rejection-report/',
            deworming: baseUrl + 'reports/bull-deworming-bull-wise-report/',
            vaccination: baseUrl + 'reports/bull-vaccination-list-report/',
            vaccinationDue: baseUrl + 'reports/bull-vaccination-due-list-report/',
            vaccinationIndividual: baseUrl + 'reports/bull-vaccination-individual-report/',
            disposalProposal: baseUrl + 'reports/bull-disposal-proposal-report/',
            disposal: baseUrl + 'reports/bull-disposal-report/',

            scrotalDueList: baseUrl + 'reports/bull-scrotal-circumference/due-list/',
            scrotalIndividual: baseUrl + 'reports/bull-scrotal-circumference/bullwise-list/',
            scrotalSummary: baseUrl + 'reports/bull-scrotal-circumference/summary/',
            scrotalShedWise: baseUrl + 'reports/bull-deworming/shedwise-list/',
            allProductionBTDays: baseUrl + 'reports/bull-semen-collection-report/all-production/',
            bullMonthlySemenStock: baseUrl + 'reports/bull-monthly-semen-stock-report/',
            bullMonthlySemenStockPeriod: baseUrl + 'reports/bull-breed-wise-monthly-stock-report/',
            bullSemenTransaction: baseUrl + 'reports/bull-semen-transaction-report/',
            // bull calf selection
            calfSelectionDueForSelection: baseUrl + 'reports/bull-calf-selection/due/',
            calfSelectionSelectedBTDates: baseUrl + 'reports/bull-calf-selection/selected/',
            calfSelectionWaitListBTDates: baseUrl + 'reports/bull-calf-selection/waiting-list/',
            bullCalfProposedForCulling: baseUrl + 'reports/bull-calf-selection/culling/',
            dueForRegularization: baseUrl + 'reports/bull-regularization-due/',
            batchListOfRegular: baseUrl + 'reports/bull-batch-report/',
            detailsOfTrainingBull: baseUrl + 'reports/bull-semen-collection-report/good-collection/',
            batchListOfRegularBatchOrShed: baseUrl + 'reports/bull-batch-report/',
            bullScrotalCircumferenceMonthly: baseUrl + 'reports/bull-scrotal-circumference-in-month/',
            bullScrotalCircumferenceMeanMeasurement: baseUrl + 'reports/bull/mean-measurement/',
            semenProduction: baseUrl + 'reports/bull/semen-production/',
            semenDespatch: baseUrl + 'reports/bull/semen-despatch/'
        },
        cows: {
            above18Months: baseUrl + 'reports/cows-above-18months/',
            below18Months: baseUrl + 'reports/cows-below-18months/',

            regNoAbove18Months: baseUrl + 'reports/cow-18above-regno-select/',
            renumberAbove18Months: baseUrl + 'reports/cow-18above-reno-select/',

            additionToUnit: baseUrl + 'reports/cow-addition-date-report/',
            bornBetweenTwoDates: baseUrl + 'reports/cow-birth-date-report/',
            livestockSummaryFormat1: baseUrl + 'reports/cow-summary1-report/',
            livestockSummaryFormat2: baseUrl + 'reports/cow-summary2-report/',
            livestockSummaryHeifers: baseUrl + 'reports/heifers-summary-report/',
            livestockSummaryYoungCow: baseUrl + 'reports/young-cow-summary-report/',
            dehorningBetweenTwoDates: baseUrl + 'reports/cow-dehorning-between_dates-report/',
            dehorningLimitCrossed: baseUrl + 'reports/cow-dehorning-limit-cross-report/',
            dueForDehorning: baseUrl + 'reports/cow-dehorning-due-report/',
            cowDeletion: baseUrl + 'reports/cow-deletion-report/',
            cowDeworming: baseUrl + 'reports/cow-deworming-report/',
            weightGainBetweenTwoMonths: baseUrl + 'reports/cow/age-group-wight-gain/',
            weightGainIndividualBetweenTwoMonths: baseUrl + 'reports/cow/individual-weight-gain/',
            weightGainBreedSourceGroupBetweenTwoMonths: baseUrl + 'reports/cow/average-weight-gain/',
            weightGainShedWise: baseUrl + 'reports/cow/shed-wise-weight-gain/',
            weightGainBreedGroupSource: baseUrl + 'reports/cow/source-breed-group-weight-gain/',
            cowVaccinationList: baseUrl + 'reports/cow-vaccination-shed-wise-report/',
            // cowVaccinationShedWise: baseUrl + 'reports/cow-vaccination-shed-wise-report/',
            cowVaccinationDue: baseUrl + 'reports/cow-vaccination-due-list-report/',
            cowIndividualVaccination: baseUrl + 'reports/cow-vaccination-individual-wise-report/',
            cowMatingProgramme: baseUrl + 'reports/cow-mating-program-report/',
            inseminationDueBetweenTwoDays: baseUrl + 'reports/ai-search/calving-not-inseminated-between-days/',
            inseminatedBetweenTwoDays: baseUrl + 'reports/ai-search/inseminated-between-days/',
            inseminationBetweenTwoDates: baseUrl + 'reports/cow-artificial-insemination-between-dates-report/',
            IndividualInseminationList: baseUrl + 'reports/ai-search/individual-inseminations/',
            cowReproductiveStatus: baseUrl + 'reports/ai-search/cow-reproductive-status/',
            cowReproductiveList: baseUrl + 'reports/ai-search/cow-vue-select/',
            heiferReproductiveStatus: baseUrl + 'reports/ai-search/heifer-reproductive-status/',
            heiferReproductiveList: baseUrl + 'reports/ai-search/heifer-vue-select/',
            cowIndividualCalvingAbortion: baseUrl + 'reports/calving-detail/cow-individual/',
            pregnancyCheckupBetweenTwoDates: baseUrl + 'reports/cow-pregnancy-between-two-dates/',
            disposalCow: baseUrl + 'reports/cow-disposal-report/',
            disposalProposalCow: baseUrl + 'reports/cow-proposal-disposal-report/',

            // cowIndividualCalvingAbortion: baseUrl + 'reports/calving-detail/cow-individual/',
            // pregnancyCheckupBetweenTwoDates: baseUrl + 'reports/cow-pregnancy-between-two-dates/',
            dueForPregnancyCheckup: baseUrl + 'reports/pregnancy-search/due-for-checkup/',
            cowsNotConfirmedPregnant: baseUrl + 'reports/pregnancy-search/not-confirmed-pregnant/',
            dueForDrying: baseUrl + 'reports/pregnancy-search/due-for-drying/',
            crossedLimitForDrying: baseUrl + 'reports/dummy-url/',
            calvedAbortedList: baseUrl + 'reports/calving-detail/cow-list/',
            dueForCalving: baseUrl + 'reports/calving-detail/due-for-calving/',
            lactationDaysWiseSearch: baseUrl + 'reports/cow-lactation-based-on-days-report/',
            milkYieldOfCowsOnDate: baseUrl + 'reports/lactation-search/cow-milk-yield/',
            IndividualMilkYield: baseUrl + 'reports/lactation-search/cow-individual-milk-yield/',
            milkRecordingBetweenDates: baseUrl + 'reports/lactation-search/cow-milk-yield/',
            milkProductionBetweenDates: baseUrl + 'reports/lactation-search/cow-milk-total-production/',
            cowLactationYield: baseUrl + 'reports/lactation-search/cow-best-lac-yield/',
            lactatingCows: baseUrl + 'reports/lactation-search/lactating-cows/',
            lactationYieldOfIndividualCow: baseUrl + 'reports/lactation-search/individual-lactating-yield/',
            lactationReportBetweenDates: baseUrl + 'reports/lactation-search/yearly-lactating-yield/',
            lactationReportAbove150BetweenDates: baseUrl + 'reports/lactation-search/yearly-lactating-yield-above-days/',
            lactationYieldOfAliveCows: baseUrl + 'reports/lactation-search/alive-cow-yields/',
            lactationSummary: baseUrl + 'reports/lactation-search/lactation-summary/',
            monthlyMilkProduction: baseUrl + 'reports/cow-monthly-milk-production-report/',
            monthlyMilkProductionDayTotal: baseUrl + 'reports/cow-day-wise-milk-production-of-month-report/',
            weightGainAgeGroupMonth: baseUrl + 'reports/cow/age-group-wise-weight-gain/',
            movingPregnancy: baseUrl + 'reports/pregnancy-search/moving-pregnancy/',
            wetAverageDayWise: baseUrl + 'reports/cow/datewise-wet-average/',
            wetAveragePeriodWise: baseUrl + 'reports/cow/periodwise-wet-average/',
            milkProductionPerfomanceOfTheCow: baseUrl + 'reports/cow/milk-production-performance/'
        },
        qualityControl: {
            spermMorphologyOfRegularBulls: baseUrl + 'reports/qc/bull-sperm-morphology-regular/',
            spermMorphologyOfTrainingBulls: baseUrl + 'reports/qc/bull-sperm-morphology-training/',
            hostTest: baseUrl + 'reports/qc/bull-host-test/',
            PIATest: baseUrl + 'reports/qc/bull-pia-test/',
            incubationTest: baseUrl + 'reports/qc/bull-incubation-test/',
            microbialLoadOfNeatSemen: baseUrl + 'reports/demmi url',
            microbialLoadOfAV: baseUrl + 'reports/qc/bull-av-test/',
            microbialLoadTestingOfLAFU: baseUrl + 'reports/qc/bull-lafu-test/',
            microbialLoadTestingOfGlassware: baseUrl + 'reports/qc/bull-glassware-test/',
            airCultureReport: baseUrl + 'reports/qc/air-culture-report/',
            microbialLoadInSemenSample: baseUrl + 'reports/qc/microbial-load-semen-test/',
            longStorageIncubationTest: baseUrl + 'reports/qc/long-storage-incubation-test/',
            longStoragePTM: baseUrl + 'reports/qc/long-storage-ptm-test/',
            yearAbstractOfMicrobialLoadOfFrozenSemen: baseUrl + 'dummyURL',
            environmentalMicrobialLoadTesting: baseUrl + 'reports/qc/environmental-microbial-load-test/'
        },
        common: {
            abstractObservation: baseUrl + 'reports/animal-observation-report/',
            cullingPattern: baseUrl + 'reports/culling-pattern-report/',
            dueForCulling: baseUrl + 'reports/bull-culling_due/',
            milkFeeding: baseUrl + 'reports/milk-feeding/',
            milkFeedingRequirement: baseUrl + 'reports/milk-requirement/',
            cullingPatternBetweenTwoDates: baseUrl + 'reports/culling-pattern-between-two-dates/',
            postMortemDetails: baseUrl + 'reports/animal-postmortem-report/',
            postMortemAnimals: baseUrl + 'reports/animal-postmortem-regno-selection/',
            postMortemBetweenTwoDates: baseUrl + 'reports/dummy-url/',
            shedDetails: baseUrl + 'reports/shed-details/',
            animalStrength: baseUrl + 'reports/progress-report/animal-strength/',
            additionAndDeletionOfStock: baseUrl + 'reports/general/addition-deletion-report/',
            stockBalance: baseUrl + 'reports/progress-report/stock-balance/',
            calfList: baseUrl + 'reports/calf-select-view/',
            weightGain: baseUrl + 'reports/bull/weight-gain-for-month-for-year/',
            reproductiveMeasure: baseUrl + 'reports/cow/reproductive-measure/',
            monthlyTraining: baseUrl + 'reports/training-centre/'
        },
        optionURLS: {
            bullRenoSelect: baseUrl + 'reports/bull-reno-select/',
            cowRenoSelect: baseUrl + 'reports/cow-reno-select/',
            breedSelect: baseUrl + 'master-data/breed-select/',
            groupSelect: baseUrl + 'master-data/group-select/',
            shedSelect: baseUrl + 'master-data/shed-select/',
            batchSelect: baseUrl + 'master-data/batch-select/',
            rsbSelect: baseUrl + 'bull/rsb-vue-select/',
            bullRsbSelect: baseUrl + 'bull/bull-rsb-vue-select/',
            semenDisposalReasonSelect: baseUrl + 'bull/semen-disposal-reason-vue-select/'

        }

    },
    dashboard: {
        topPart: baseUrl + 'general/dashboard/',
        cow: baseUrl + 'general/dashboard-cow/',
        breeding: baseUrl + 'general/dashboard-breeding/',
        bullDashboard: baseUrl + 'general/dashboard-bull/',
        bullProduced: baseUrl + 'general/dashboard-bull-production/'
    },
    bullImages: {
        addEdit: baseUrl + 'bull/bull-images/add-edit/',
        list: baseUrl + 'bull/bull-images/list/',
        delete: baseUrl + 'bull/bull-images/delete/'
    },
    cowImages: {
        addEdit: baseUrl + 'cow/cow-images/add-edit/',
        list: baseUrl + 'cow/cow-images/list/',
        delete: baseUrl + 'cow/cow-images/delete/'
    }

};
