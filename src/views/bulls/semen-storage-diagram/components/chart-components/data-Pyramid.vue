<template>
    <div>
        <div class="fl-y fl-j-c">
            <div>
                <b-chamber-new @item="selectedItem" :item-selected="activeItem === 'A1'" text="A1" :color="getKeyOutput('A1')"></b-chamber-new>
            </div>
            <div class="fl-x">
                <b-chamber-new @item="selectedItem" :item-selected="activeItem === 'B1'" text="B1" :color="getKeyOutput('B1')">
                </b-chamber-new>

                <b-chamber-new @item="selectedItem" :item-selected="activeItem === 'B2'" text="B2" :color="getKeyOutput('B2')"></b-chamber-new>
            </div>

            <div class="fl-x">
                <b-chamber-new @item="selectedItem" :item-selected="activeItem === 'C1'" text="C1" :color="getKeyOutput('C1')"></b-chamber-new>
                <b-chamber-new @item="selectedItem" :item-selected="activeItem === 'C2'" text="C2" :color="getKeyOutput('C2')"></b-chamber-new>
                <b-chamber-new @item="selectedItem" :item-selected="activeItem === 'C3'" text="C3" :color="getKeyOutput('C3')"></b-chamber-new>

            </div>
            <div class="fl-x">
                <b-chamber-new @item="selectedItem" :item-selected="activeItem === 'D1'" text="D1" :color="getKeyOutput('D1')"></b-chamber-new>
                <b-chamber-new @item="selectedItem" :item-selected="activeItem === 'D2'" text="D2" :color="getKeyOutput('D2')"></b-chamber-new>
                <b-chamber-new @item="selectedItem" :item-selected="activeItem === 'D3'" text="D3" :color="getKeyOutput('D3')"></b-chamber-new>
                <b-chamber-new @item="selectedItem" :item-selected="activeItem === 'D4'" text="D4" :color="getKeyOutput('D4')"></b-chamber-new>

            </div>
            <div class="fl-x">
                <b-chamber-new @item="selectedItem" :item-selected="activeItem === 'E1'" text="E1" :color="getKeyOutput('E1')"></b-chamber-new>
                <b-chamber-new @item="selectedItem" :item-selected="activeItem === 'E2'" text="E2" :color="getKeyOutput('E2')"></b-chamber-new>
                <b-chamber-new @item="selectedItem" :item-selected="activeItem === 'E3'" text="E3" :color="getKeyOutput('E3')"></b-chamber-new>
                <b-chamber-new @item="selectedItem" :item-selected="activeItem === 'E4'" text="E4" :color="getKeyOutput('E4')"></b-chamber-new>
                <b-chamber-new @item="selectedItem" :item-selected="activeItem === 'E5'" text="E5" :color="getKeyOutput('E5')"></b-chamber-new>

            </div>
            <div class="fl-x">
                <b-chamber-new @item="selectedItem" :item-selected="activeItem === 'F1'" text="F1" :color="getKeyOutput('F1')"></b-chamber-new>
                <b-chamber-new @item="selectedItem" :item-selected="activeItem === 'F2'" text="F2" :color="getKeyOutput('F2')"></b-chamber-new>
                <b-chamber-new @item="selectedItem" :item-selected="activeItem === 'F3'" text="F3" :color="getKeyOutput('F3')"></b-chamber-new>
                <b-chamber-new @item="selectedItem" :item-selected="activeItem === 'F4'" text="F4" :color="getKeyOutput('F4')"></b-chamber-new>
                <b-chamber-new @item="selectedItem" :item-selected="activeItem === 'F5'" text="F5" :color="getKeyOutput('F5')"></b-chamber-new>
                <b-chamber-new @item="selectedItem" :item-selected="activeItem === 'F6'" text="F6" :color="getKeyOutput('F6')"></b-chamber-new>

            </div>
            <div class="fl-x-cc pr-8 mr-3">
                <p class="font-poppins-bold  text-black mt-4">{{ chamber }} Chamber</p>

            </div>
        </div>
    </div>
</template>

<script>
// import AChamber from '@/views/bulls/semen-storage-diagram/A-Chamber';
import BChamberNew from '@/views/bulls/semen-storage-diagram/components/B-Chamber-New';

export default {
    name: 'data-pyramid',
    data () {
        return {
            activeItem: '',
            loading: false
        };
    },
    props: {
        chamber: {
            type: String
        },
        filledData: {
            type: Array
        }
    },
    components: { BChamberNew },
    watch: {
        filledData: function (newData) {
            if (newData) {
                console.log('NewData:>>>: ');
            }
        }
    },
    methods: {
        selectedItem (item) {
            this.$emit('item', item);
            this.activeItem = item;
        },
        getKeyOutput (keyToFind) {
            for (let i = 0; i < this.filledData.length; i++) {
                const obj = this.filledData[i];
                const keys = Object.keys(obj);

                if (keys.includes(keyToFind)) {
                    const value = obj[keyToFind];

                    switch (value) {
                    case 'X':
                        return 'twelveth';
                    case 'A':
                        return 'warning';
                    case 'B':
                        return 'seventh';
                    case 'C':
                        return 'eighth';
                    case 'D':
                        return 'nineth';
                    case 'E':
                        return 'eleventh';
                    default:
                        return value;
                    }
                }
            }
            return null;
        }

    }

};
</script>

<style scoped>

</style>
