import store from '../store';

const getMenu = function () {
    const user = store.getters.currentUser;

    const menu = [
        {
            icon: '',
            text: 'Home',
            link: '/home/'
        },
        // {
        //     text: 'Help',
        //     link: '#'
        // },
        // {
        //     text: user.username,
        //     link: '#'
        // },
        {
            // icon: 'fa fa-user',
            class: 'ml-auto',
            text: user.username,
            items: [
                {
                    text: 'Change Password',
                    event: 'changePassword'
                },
                {
                    text: 'Logout',
                    class: 'menu-text-danger',
                    event: 'logout'
                }
            ]
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
