<template>

    <div

    >
        <q-splitter
                v-model="hSplitterModel"
                horizontal
                separator-class="bg-blue"
                separator-style="height: 4px"
                class="h-splitter"
        >

            <template v-slot:before>
                <q-splitter
                        v-model="vSplitterModel"
                        separator-class="bg-red"
                        separator-style="width: 3px"
                        :limits="[5,95]"
                >

                    <template v-slot:before>
                        <div class="q-pa-md" id="chart-container">
                            <candle-stick-chart/>
                        </div>
                    </template>

                    <template v-slot:separator>
                        <q-avatar color="primary" text-color="white" size="30px" icon="drag_indicator"/>
                    </template>

                    <template v-slot:after>
                        <div class="q-pa-xs" style="height: 100%;">
                            <crypto-news/>
                        </div>
                    </template>
                </q-splitter>
            </template>

            <template v-slot:after>
                <div class="q-pa-md">
                    <crypto-table/>
                </div>
            </template>
        </q-splitter>

    </div>


</template>

<script>
import {api} from "@/plugins/http.js";
import {useMainStore} from "@/store/mainStore.js";
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";
import {TabulatorFull as Tabulator} from 'tabulator-tables';

// import {Tabulator, FormatModule, EditModule, FilterModule, SortModule} from "tabulator-tables";
// Tabulator.registerModule([FormatModule, EditModule, FilterModule, SortModule]);
import CandleStickChart from "@/components/CandleStickChart.vue";
import CryptoTable from "@/components/CryptoTable.vue";
import CryptoNews from "@/components/CryptoNews.vue";

export default {
    name: "Page1",
    components: {CryptoNews, CryptoTable, CandleStickChart},
    setup() {

        const mainStore = useMainStore();

        const checkApiCall = async () => {
            const response = await api.get("/api/v1/");
            console.log(response);
        };


        onMounted(async () => {
                await mainStore.fetchCandles();
            }
        );

        const hSplitterModel = ref(50);
        const cssTableHeight= ref(`calc(${100 - hSplitterModel.value}vh - 90px)`)
        return {
            checkApiCall,
            hSplitterModel,
            vSplitterModel: ref(70), // start at 50%
            cssTableHeight,
        };
    }
};
</script>

<style>
@import "tabulator-tables/dist/css/tabulator_modern.min.css";

/*.my-table {*/
/*  height: 500px;*/
/*  width: 100%;*/
/*  font-size: 12px;*/
/*}*/

.h-splitter {
    height: calc(100vh)
}

.table-container {
    height: v-bind(cssTableHeight);
    font-size: 12px;

}

</style>