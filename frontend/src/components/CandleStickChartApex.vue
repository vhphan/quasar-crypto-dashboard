<template>
  <div>
    <apexchart width="500" type="candlestick" :options="candlesOptions" :series="candleSeries"></apexchart>
  </div>
</template>

<script setup>
import {useMainStore} from "@/store/mainStore.js";
import {storeToRefs} from "pinia";
import {computed} from "vue";

const store = useMainStore();
const {candles} = storeToRefs(store);

const candleSeries = computed(() => {

  return [{

    data: candles.value.map((candle) => {
      return {
        x: new Date(candle.time),
        y: [candle.open, candle.high, candle.low, candle.close]
      };
    })

  }];
});

const candlesOptions = {
  // series: [{
  //   data: candleSeries
  // }],
  chart: {
    type: 'candlestick',
    height: 290,
    id: 'candles',
    toolbar: {
      autoSelected: 'pan',
      show: false
    },
    zoom: {
      enabled: false
    },
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: '#3C90EB',
        downward: '#DF7D46'
      }
    }
  },
  xaxis: {
    type: 'datetime'
  }
};

//
// const optionsBar = {
//   series: [{
//     name: 'volume',
//     data: seriesDataLinear
//   }],
//   chart: {
//     height: 160,
//     type: 'bar',
//     brush: {
//       enabled: true,
//       target: 'candles'
//     },
//     selection: {
//       enabled: true,
//       xaxis: {
//         min: new Date('20 Jan 2017').getTime(),
//         max: new Date('10 Dec 2017').getTime()
//       },
//       fill: {
//         color: '#ccc',
//         opacity: 0.4
//       },
//       stroke: {
//         color: '#0D47A1',
//       }
//     },
//   },
//   dataLabels: {
//     enabled: false
//   },
//   plotOptions: {
//     bar: {
//       columnWidth: '80%',
//       colors: {
//         ranges: [{
//           from: -1000,
//           to: 0,
//           color: '#F15B46'
//         }, {
//           from: 1,
//           to: 10000,
//           color: '#FEB019'
//         }],
//
//       },
//     }
//   },
//   stroke: {
//     width: 0
//   },
//   xaxis: {
//     type: 'datetime',
//     axisBorder: {
//       offsetX: 13
//     }
//   },
//   yaxis: {
//     labels: {
//       show: false
//     }
//   }
// };

</script>

<style scoped>

</style>