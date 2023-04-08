<template>
    <div class="q-pa-xs">
        <q-select
                v-model="symbol"
                :options="tradedSymbolsForCoin"
                label="Select Symbol"
                filled
                dense
                bg-color="white"
                style="width: 10rem;"
        />
    </div>
</template>

<script setup>
import {useMainStore} from "@/store/mainStore.js";
import {storeToRefs} from "pinia";

const mainStore = useMainStore();
const {tradedSymbolsForCoin, symbol} = storeToRefs(mainStore);

</script>

<style scoped>

</style>