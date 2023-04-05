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

                        </div>
                    </template>
                </q-splitter>
            </template>

            <template v-slot:after>
                <div class="q-pa-md">
                    <div ref="tableRef" class="table-container"></div>
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
import {minMaxFilterEditor, minMaxFilterFunction} from "@/utils/tblFuncs.js";
import CandleStickChart from "@/components/CandleStickChart.vue";

export default {
    name: "Page1",
    components: {CandleStickChart},
    setup() {

        const mainStore = useMainStore();
        const tableRef = ref(null);
        const tabulatorTable = ref(null);
        const {topCoins} = storeToRefs(mainStore);

        const checkApiCall = async () => {
            const response = await api.get("/api/v1/");
            console.log(response);
        };

        const numberColumns = [
            "total_volume",
            "circulating_supply",
            "total_supply",
            "ath",
            "ath_change_percentage",
            "market_cap_change_percentage_24h"
        ];
        const moneyColumns = [
            "market_cap",
            "market_cap_change_24h",
            "current_price",
            "high_24h",
            "low_24h",
            "price_change_24h",
        ];
        const priceColumns = [
            "current_price",
            "high_24h",
            "low_24h",
            "price_change_24h",
        ];

        onMounted(async () => {
                await mainStore.fetchTopCoins();
                tabulatorTable.value = new Tabulator(tableRef.value, {
                    data: topCoins.value,
                    reactiveData: true,
                    autoColumns: true,
                    pagination: "local",
                    paginationSize: 10,
                    paginationSizeSelector: [10, 20, 30, 40, 50],
                    movableColumns: true,
                    resizableRows: true,
                    tooltips: true,

                    autoColumnsDefinitions: function (definitions) {
                        definitions.forEach((column) => {
                                column.headerFilter = true; // add header filter to every column
                                // column.maxWidth = 150;
                                column.headerTooltip = true;
                                column.headerWordWrap = true;
                                column.hozAlign = "right";

                                if (numberColumns.includes(column.field)) {
                                    column.headerFilter = minMaxFilterEditor;
                                    column.headerFilterFunc = minMaxFilterFunction;
                                }
                                if (column.field === "image") {
                                    column.formatter = "image";
                                    column.formatterParams = {
                                        height: "20px",
                                        width: "20px",
                                    };
                                }
                                if (moneyColumns.includes(column.field)) {
                                    column.formatter = "money";
                                    column.formatterParams = {
                                        precision: priceColumns.includes(column.field) ? 2 : 0,
                                        thousand: ",",
                                        symbol: "$",
                                        symbolAfter: false,
                                    };
                                }
                            }
                        );

                        return definitions;
                    },

                });
                await mainStore.fetchCandles();
            }
        );


        return {
            checkApiCall,
            tabulatorTable,
            tableRef,
            hSplitterModel: ref(50), // start at 50%
            vSplitterModel: ref(50), // start at 50%
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
    height: calc(50vh - 35px);
    font-size: 12px;

}

</style>