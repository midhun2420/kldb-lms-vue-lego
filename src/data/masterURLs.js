const prod = process.env.NODE_ENV === 'production';

let baseUrl;
if (prod) {
    baseUrl = '/api/master-data/';
} else {
    baseUrl = '/api/master-data/';
}

export default {
    master: {
        registrationType: {
            list: baseUrl + 'registration-type-list/',
            addEdit: baseUrl + 'registration-type-add-edit/',
            delete: baseUrl + 'registration-type-delete/',
            vueSelect: baseUrl + 'registration-type-vue-select/',
            details: baseUrl + 'registration-type-detail/'
        },
        animalType: {
            list: baseUrl + 'animal-type-list/',
            addEdit: baseUrl + 'animal-type-add-edit/',
            delete: baseUrl + 'animal-type-delete/',
            vueSelect: baseUrl + 'animal-type-vue-select/',
            details: baseUrl + 'animal-type-detail/'
        },
        storageType: {
            list: baseUrl + 'storage-type-list/',
            addEdit: baseUrl + 'storage-type-add-edit/',
            delete: baseUrl + 'storage-type-delete/',
            vueSelect: baseUrl + 'storage-type-vue-select/',
            details: baseUrl + 'storage-type-detail/'
        },
        source: {
            list: baseUrl + 'source-list/',
            addEdit: baseUrl + 'source-add-edit/',
            delete: baseUrl + 'source-delete/',
            vueSelect: baseUrl + 'source-vue-select/',
            details: baseUrl + 'source-detail/'
        },
        breed: {
            list: baseUrl + 'breed-list/',
            addEdit: baseUrl + 'breed-add-edit/',
            delete: baseUrl + 'breed-delete/',
            vueSelect: baseUrl + 'breed-vue-select/',
            details: baseUrl + 'breed-detail/'
        },
        shed: {
            list: baseUrl + 'shed-list/',
            addEdit: baseUrl + 'shed-add-edit/',
            delete: baseUrl + 'shed-delete/',
            vueSelect: baseUrl + 'shed-vue-select/',
            details: baseUrl + 'shed-detail/'
        },
        batch: {
            list: baseUrl + 'batch-list/',
            addEdit: baseUrl + 'batch-add-edit/',
            delete: baseUrl + 'batch-delete/',
            disable: baseUrl + 'batch-active-inactive/',
            vueSelect: baseUrl + 'batch-vue-select/',
            details: baseUrl + 'batch-detail/'

        },
        VaccinationType: {
            list: baseUrl + 'vaccination-type-list/',
            addEdit: baseUrl + 'vaccination-type-add-edit/',
            delete: baseUrl + 'vaccination-type-delete/',
            vueSelect: baseUrl + 'vaccination-type-vue-select/',
            details: baseUrl + 'vaccination-type-detail/'
        },
        location: {
            country: {
                list: baseUrl + 'country-list/',
                addEdit: baseUrl + 'country-add-edit/',
                delete: baseUrl + 'country-delete/',
                vueSelect: baseUrl + 'country-vue-select/',
                details: baseUrl + 'country-detail/'
            },
            state: {
                list: baseUrl + 'state-list/',
                addEdit: baseUrl + 'state-add-edit/',
                delete: baseUrl + 'state-delete/',
                vueSelect: baseUrl + 'state-vue-select/',
                details: baseUrl + 'state-detail/'
            },
            district: {
                list: baseUrl + 'district-list/',
                addEdit: baseUrl + 'district-add-edit/',
                delete: baseUrl + 'district-delete/',
                vueSelect: baseUrl + 'district-vue-select/',
                details: baseUrl + 'district-detail/'
            }

        },
        dehorningType: {
            list: baseUrl + 'dehorning-type-list/',
            addEdit: baseUrl + 'dehorning-type-add-edit/',
            delete: baseUrl + 'dehorning-type-delete/',
            vueSelect: baseUrl + 'dehorning-type-vue-select/',
            details: baseUrl + 'dehorning-type-detail/'
        },
        group: {
            list: baseUrl + 'group-list/',
            addEdit: baseUrl + 'group-add-edit/',
            delete: baseUrl + 'group-delete/',
            vueSelect: baseUrl + 'group-vue-select/',
            details: baseUrl + 'group-detail/'
        },
        doseType: {
            list: baseUrl + 'dose-type-list/',
            addEdit: baseUrl + 'dose-type-add-edit/',
            delete: baseUrl + 'dose-type-delete/',
            vueSelect: baseUrl + 'dose-type-vue-select/',
            details: baseUrl + 'dose-type-detail/'
        },
        collection: {
            list: baseUrl + 'collection-list/',
            addEdit: baseUrl + 'collection-add-edit/',
            delete: baseUrl + 'collection-delete/',
            vueSelect: baseUrl + 'collection-vue-select/',
            details: baseUrl + 'collection-detail/'
        },
        quarantineLocation: {

            list: baseUrl + 'quarantine-location-list/',
            addEdit: baseUrl + 'quarantine-location-add-edit/',
            delete: baseUrl + 'quarantine-location-delete/',
            vueSelect: baseUrl + 'quarantine-location-vue-select/',
            details: baseUrl + 'quarantine-location-detail/'
        },
        quarantinePosition: {
            list: baseUrl + 'quarantine-position-list/',
            addEdit: baseUrl + 'quarantine-position-add-edit/',
            delete: baseUrl + 'quarantine-position-delete/',
            vueSelect: baseUrl + 'quarantine-position-vue-select/',
            details: baseUrl + 'quarantine-position-detail/'
        },
        diseaseType: {
            list: baseUrl + 'disease-type-list/',
            addEdit: baseUrl + 'disease-type-add-edit/',
            delete: baseUrl + 'disease-type-delete/',
            vueSelect: baseUrl + 'disease-type-vue-select/',
            details: baseUrl + 'disease-type-detail/'
        },
        agency: {
            list: baseUrl + 'agency-list/',
            addEdit: baseUrl + 'agency-add-edit/',
            delete: baseUrl + 'agency-delete/',
            vueSelect: baseUrl + 'agency-vue-select/',
            details: baseUrl + 'agency-detail/',
            disable: baseUrl + 'agency-disable/'
        },
        frequency: {
            list: baseUrl + 'frequency-list/',
            addEdit: baseUrl + 'frequency-add-edit/',
            delete: baseUrl + 'frequency-delete/',
            vueSelect: baseUrl + 'frequency-vue-select/',
            details: baseUrl + 'frequency-detail/'
        },
        course: {
            list: baseUrl + 'course-list/',
            addEdit: baseUrl + 'course-add-edit/',
            delete: baseUrl + 'course-delete/',
            vueSelect: baseUrl + 'course-vue-select/',
            details: baseUrl + 'course-detail/'
        },
        abnormality: {
            list: baseUrl + 'abnormality-list/',
            addEdit: baseUrl + 'abnormality-add-edit/',
            delete: baseUrl + 'abnormality-delete/',
            vueSelect: baseUrl + 'abnormality-vue-select/',
            typeVueSelect: baseUrl + 'abnormality-type-vue-select/',
            details: baseUrl + 'abnormality-detail/'
        },
        glasswareSample: {
            list: baseUrl + 'glassware-sample-list/',
            addEdit: baseUrl + 'glassware-sample-add-edit/',
            delete: baseUrl + 'glassware-sample-delete/',
            vueSelect: baseUrl + 'glassware-sample-vue-select/',
            details: baseUrl + 'glassware-sample-detail/'
        },
        glasswareVolume: {
            list: baseUrl + 'glassware-volume-list/',
            addEdit: baseUrl + 'glassware-volume-add-edit/',
            delete: baseUrl + 'glassware-volume-delete/',
            vueSelect: baseUrl + 'glassware-volume-vue-select/',
            details: baseUrl + 'glassware-volume-detail/'
        },
        equipment: {
            list: baseUrl + 'equipment-list/',
            addEdit: baseUrl + 'equipment-add-edit/',
            delete: baseUrl + 'equipment-delete/',
            vueSelect: baseUrl + 'equipment-vue-select/',
            details: baseUrl + 'equipment-detail/'
        },
        rsb: {
            list: baseUrl + 'rsb-list/',
            addEdit: baseUrl + 'rsb-add-edit/',
            delete: baseUrl + 'rsb-delete/',
            vueSelect: baseUrl + 'rsb-loc_vue-select/',
            select: baseUrl + 'rsb-select/',
            details: baseUrl + 'rsb-detail/'
        },
        csbrooms: {
            list: baseUrl + 'csb-room-list/',
            addEdit: baseUrl + 'csb-room-add-edit/',
            delete: baseUrl + 'csb-room-delete/',
            vueSelect: baseUrl + 'csb-room-loc_vue-select/'
        },
        reasonForCulling: {
            list: baseUrl + 'reason-for-culling-list/',
            addEdit: baseUrl + 'reason-for-culling-add-edit/',
            delete: baseUrl + 'reason-for-culling-delete/',
            vueSelect: baseUrl + 'reason-for-culling-vue-select/',
            details: baseUrl + 'reason-for-culling-detail/'
        },
        modeOfDisposal: {
            list: baseUrl + 'mode-of-disposal-list/',
            addEdit: baseUrl + 'mode-of-disposal-add-edit/',
            delete: baseUrl + 'mode-of-disposal-delete/',
            vueSelect: baseUrl + 'mode-of-disposal-vue-select/',
            details: baseUrl + 'mode-of-disposal-detail/'
        },
        reasonForDisposal: {
            list: baseUrl + 'reason-for-disposal-list/',
            addEdit: baseUrl + 'reason-for-disposal-add-edit/',
            delete: baseUrl + 'reason-for-disposal-delete/',
            vueSelect: baseUrl + 'reason-for-disposal-vue-select/',
            details: baseUrl + 'reason-for-disposal-detail/'
        },
        embryoStockPosition: {
            list: baseUrl + 'stock-position-list/',
            addEdit: baseUrl + 'stock-position-add-edit/',
            delete: baseUrl + 'stock-position-delete/',
            vueSelect: baseUrl + 'stock-position-vue-select/',
            details: baseUrl + 'stock-position-detail/'
        },
        unit: {
            list: baseUrl + 'unit-list/',
            addEdit: baseUrl + 'unit-add-edit/',
            delete: baseUrl + 'unit-delete/',
            vueSelect: baseUrl + 'unit-vue-select/',
            details: baseUrl + 'unit-detail/'
        },
        crop: {
            list: baseUrl + 'crop-list/',
            addEdit: baseUrl + 'crop-add-edit/',
            delete: baseUrl + 'crop-delete/',
            vueSelect: baseUrl + 'crop-vue-select/',
            details: baseUrl + 'crop-detail/'
        },
        bookValue: {
            list: baseUrl + 'book-value-list/',
            addEdit: baseUrl + 'book-value-add-edit/',
            delete: baseUrl + 'book-value-delete/',
            vueSelect: baseUrl + 'crop-vue-select/',
            details: baseUrl + 'book-value-detail/',
            getBookValue: baseUrl + 'book-value-get/',
            getMeatValue: baseUrl + 'meat-value-get/'
        },
        rejectedReason: {
            list: baseUrl + 'rejected-reason-list/',
            addEdit: baseUrl + 'rejected-reason-add-edit/',
            delete: baseUrl + 'rejected-reason-delete/',
            vueSelect: baseUrl + 'rejected-reason-vue-select/'
        }

    }
};
