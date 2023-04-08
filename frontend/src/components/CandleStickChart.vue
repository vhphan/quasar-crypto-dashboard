<template>
    <div class="q-pa-md full-height row">

        <v-chart
                ref="chartRef"
                :option="chartOptions"
                auto-resize
                :init-options="{renderer: 'svg'}"
                class="full-width"
                style="min-height: 500px;"
        />
        <q-resize-observer @resize="onResize"/>
    </div>
</template>

<script setup>
import {computed, ref, watch} from "vue";

import VChart from "vue-echarts";
import {
    use,
    registerTheme,
    connect,
    disconnect
} from "echarts/core";
import {
    BarChart,
    LineChart,
    LinesChart,
    CandlestickChart,
} from "echarts/charts";
import {
    GridComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    DatasetComponent,
    ToolboxComponent,
    DataZoomComponent,
    BrushComponent,
    VisualMapComponent,
    AxisPointerComponent,
} from "echarts/components";
import {CanvasRenderer, SVGRenderer} from "echarts/renderers";

use([
    AxisPointerComponent,
    BarChart,
    BrushComponent,
    CandlestickChart,
    CanvasRenderer,
    DatasetComponent,
    DataZoomComponent,
    GridComponent,
    LineChart,
    LinesChart,
    LegendComponent,
    SVGRenderer,
    TooltipComponent,
    TitleComponent,
    ToolboxComponent,
    VisualMapComponent,
]);
import {useCandleStickChart} from "@/charts/candleStickVer1.js";
import {useMainStore} from "@/store/mainStore.js";

import {storeToRefs} from "pinia";
import {debounce} from "quasar";

const chartRef = ref(null);
const mainStore = useMainStore();
const {candles, symbol} = storeToRefs(mainStore);
const {chartOptions} = useCandleStickChart(candles, symbol, '#FF0000', '#00FF00');

const chartWidth = ref(200);

const onResize = debounce((size) => {
    if (!chartRef.value) return;
    chartRef.value.resize();
    console.log('resize', size);
    chartWidth.value = size.width;
}, 1000);

watch(symbol, (newVal, oldVal) => {
    mainStore.fetchCandles();
},);

watch(candles, (newVal, oldVal) => {
    if (!chartRef.value) return;
    chartRef.value.setOption(chartOptions.value);
}, {deep: true});


const chartStyle = computed(() => {
    return {
        width: chartWidth.value + 'px',
        minHeight: '300px',
    };
});

</script>

<style>
.chart {
    width: 300px;
    min-height: 300px;
}
</style>