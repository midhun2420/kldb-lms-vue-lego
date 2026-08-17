import store from '../store';

const getMenu = function () {
    const user = store.getters.currentUser;

    const menu = [
        {
            icon: '',
            class: 'icon-10 ml-2 mt-3',
            text: '',
            link: '/dashboard/'
        },
        {
            icon: '',
            class: 'bull-icon',
            text: '',
            link: '/semen-station/'
        },
        {
            text: '',
            class: 'icon-2',
            link: '/quality-control/'
            // items: [
            //     {
            //         text: '',
            //         link: '/app/master-data/'
            //     },
            //     {
            //         text: '',
            //         link: '/app/master-data/'
            //     }
            // ]
        },
        {
            icon: '',
            class: 'icon-6',
            text: '',
            link: '/ah-section/'
        },
        {
            icon: '',
            class: 'icon-5',
            text: '',
            link: '/embryo-transfer/'
        },
        {
            icon: '',
            class: 'icon-3',
            text: '',
            link: '/fodder/'
        },
        {
            icon: '',
            class: 'icon-4',
            text: '',
            link: '/training-center/'
        },
        {
            icon: '',
            class: 'icon-7',
            text: '',
            link: '/general/'
        },
        {
            icon: '',
            class: 'icon-9 pl-1 mt-4 pt-2',
            text: '',
            link: '/reports/'
        },
        {
            icon: '',
            class: 'icon-8 pl-1 mt-4 pt-2',
            text: '',
            link: '/master-data/'
        }

    ];

    const adminMenu = [
        // {
        //     text: 'Admin Master Data',
        //     link: '#',
        //     items: [
        //         {
        //             text: 'Master Data',
        //             link: '/app/master-data/'
        //         },
        //     ]
        // }
    ];

    // Do something similar for any number of roles
    if (user && user.admin === true) {
        return [
            ...menu,
            ...adminMenu
        ];
    }
    return [
        ...menu
    ];
};
export default getMenu;
