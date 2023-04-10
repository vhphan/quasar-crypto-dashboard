<template>
    <div ref="tableRef" class="table-container"></div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {TabulatorFull as Tabulator} from "tabulator-tables";
import {minMaxFilterEditor, minMaxFilterFunction} from "@/utils/tblFuncs.js";
import {useMainStore} from "@/store/mainStore.js";
import {storeToRefs} from "pinia";

const tabulatorTable = ref(null);
const tableRef = ref(null);
const mainStore = useMainStore();
const {topCoins} = storeToRefs(mainStore);

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

const {symbol, interval, limit} = storeToRefs(mainStore);

onMounted(async () => {
    await mainStore.fetchTopCoins();
    const additionalTableOptions = {
        selectable: 1,
    };
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
        ...additionalTableOptions,

    });
    tabulatorTable.value.on("rowSelected", (row) => {
        mainStore.setCoin(row.getData().symbol);
    });
});
    const {tradedSymbolsForCoin} = storeToRefs(mainStore);

</script>

<style scoped>

</style>