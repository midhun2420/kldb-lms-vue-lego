<template>
    <div>
        <div class="bg-2 nav-container py-2 bs-1">
            <notifications/>
            <lego-nav-bar logo-text="" drop-down-animation="fade" hover-effect="0"
                          class="headerFixed nav text-white bg-2" shadow="0" :items="menu1" @link-event="linkEvent">
                <template #logo>
                    <div class="text-1 fl-x fl-a-c">
                        <img src="../assets/web/logo/logo.svg" @click="$router.push('/dashboard/')" alt="" class="logo-img mu-p">
                        <div class="ml-lg-4">
                            <p class="mb-2 font-weight-bold">HERD MANAGEMENT SOFTWARE</p>
                            <p class="fs-lg-1" v-if="currentUser.office">KLDB : <span class="text-primary">{{ currentUser.office.toUpperCase() }}</span></p>
                            <p class="fs-lg-1" v-else>KLDB : <span class="text-primary"> Empty </span></p>
                        </div>
                    </div>
                    <!--                    <img src="../assets/web/sidebar-icons/icon-5-blue.svg" class="pr-lg-8" alt="">-->
                </template>
            </lego-nav-bar>
        </div>
        <div class="page page-sidebar">
            <notifications/>
            <lego-side-bar class="text-white bg-2" @link-event="linkEvent" drop-down-animation="fade" :items="menu"
                           :logo-text="''"
                           :colored="false" has-separator
                           @logo-clicked="redirect"
                           v-if="!pagesNoSidebar.includes($router.currentRoute.name)">
            </lego-side-bar>

            <div class="page-content-outer">

                <!--            </lego-nav-bar>-->

                <div class="page-content">
                    <div class="thin-scrollbar section-bg"
                         :class="{'padding-filled': $router.currentRoute.path ==='/bulls-list/'
                                    ,'p-7 pt-8': !pagesNoPadding.includes($router.currentRoute.name)}">
                        <transition name="fade"
                                    enter-active-class="animated fadeIn"
                                    leave-active-class="animated fadeOut" mode="out-in">
                            <router-view>

                            </router-view>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
        <modal ref="logout" :show-additional-buttons="true" title="" width="30r" no-close-on-backdrop>
            <logout></logout>
        </modal>
        <modal ref="password" :show-additional-buttons="true" title="" width="40r" no-close-on-backdrop>
            <change-password-page @cancel="closeModal"/>
        </modal>

    </div>
</template>

<script>
import LegoNavBar from 'lego-framework/src/components/NavBar';
import LegoSideBar from 'lego-framework/src/components/SideNavBar';
import getMenu from '../data/sidemenu';
import getMenu1 from '../data/navMenu';
import Logout from '../views/auth/logout';
import { mapGetters } from 'vuex';
import ChangePasswordPage from '../views/auth/changePasswordPage';

export default {
    components: {
        ChangePasswordPage,
        Logout,
        LegoNavBar,
        LegoSideBar
    },
    computed: {
        ...mapGetters(['currentUser'])
    },
    data () {
        return {
            menu: getMenu(),
            menu1: getMenu1(),
            value: '',
            year: new Date().getFullYear(),
            pagesNoSidebar: ['HomePage', 'FodderMainPage', 'GeneralPage', 'EmbryoTransferSection', 'QualityControlPage', 'Details'],
            pagesNoPadding: ['HerdDetailsPage', 'BullsListPage', 'Details', 'CowDetailPage']
        };
    },
    methods: {
        closeModal () {
            this.$refs.password.close();
        },
        redirect () {
            this.$router.push({ path: '/' });
        },
        testNotification () {
            this.$notify('Successfully Added', 'Success',
                {
                    type: 'success'
                }
            );
        },
        linkEvent (link) {
            if (link === 'changePassword') {
                this.$refs.password.show();
            }
            if (link === 'logout') {
                this.$refs.logout.show();
            }
        }
    },
    metaInfo: {
        titleTemplate: '%s - Project Name',
        htmlAttrs: {
            lang: 'en',
            amp: true
        }
    },
    name: 'MainLayout'
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
    opacity: 0;
}

.section-bg {
    max-height: 100vh;
    background: url("../assets/web/bg/section-bg.svg");
    background-position: bottom;
    background-size: contain;
    background-repeat: no-repeat;
}

.padding-filled {
    padding-left: 4rem;
    padding-top: 6.2rem;
}
</style>
