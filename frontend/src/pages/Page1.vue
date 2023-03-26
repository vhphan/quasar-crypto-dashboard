<template>
  <div>

    <div ref="tableRef" class="my-table"></div>

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

export default {
  name: "Page1",
  setup() {

    const mainStore = useMainStore();
    const tableRef = ref(null);
    const tabulatorTable = ref(null);
    const {topGainers24Hours} = storeToRefs(mainStore);

    const checkApiCall = async () => {
      const response = await api.get("/api/v1/");
      console.log(response);
    };

    const numberColumns = [
      "priceChange",
      "priceChangePercent",
      "weightedAvgPrice",
      "prevClosePrice",
    ];

    onMounted(async () => {
          await mainStore.fetchTopGainers24Hours();
          tabulatorTable.value = new Tabulator(tableRef.value, {
            data: topGainers24Hours.value,
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

                  }
              );

              return definitions;
            },

          });
        }
    );


    return {
      checkApiCall,
      tabulatorTable,
      tableRef,
    };
  }
};
</script>

<style>
@import "tabulator-tables/dist/css/tabulator_modern.min.css";

.my-table {
  height: 500px;
  width: 100%;
  font-size: 12px;
}

</style>