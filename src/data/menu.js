import store from '../store';

const getMenu = function () {
    const user = store.getters.currentUser;

    const menu = [
        {
            icon: '',
            text: '',
            link: '/app/dashboard/'
        }
        // {
        //     text: 'Master Data',
        //     link: '#',
        //     items: [
        //         {
        //             text: 'Master Data',
        //             link: '/app/master-data/'
        //         },
        //         {
        //             text: 'Master Data',
        //             link: '/app/master-data/'
        //         }
        //     ]
        // }
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
        //         {
        //             text: 'Master Data',
        //             link: '/app/master-data/'
        //         }
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
