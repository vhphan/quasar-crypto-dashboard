<template>

    <q-card>
        <q-tabs
                v-model="tab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator
        >
            <q-tab name="selectedCoinNews" label="Selected Coin News"/>
            <q-tab name="topNews" label="Top News"/>
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="selectedCoinNews">

                <q-list bordered class="rounded-borders">

                    <q-expansion-item
                        v-for="news in cryptoNews.results"
                        :key="news.id"
                        expand-separator
                        :label="news.title"
                        :caption="`${news.domain} published at ${news.published_at}`"
                        v-model="selectedModel[news.id]"
                        header-class="text-weight-bold"
                        header-style="font-size: 1rem"
                    >
                        <q-card
                            class="crypto-news"
                            flat
                            bordered
                        >
                            <news-details
                                :news="news"
                                v-if="selectedModel[news.id]"
                            />
                        </q-card>
                    </q-expansion-item>


                </q-list>


            </q-tab-panel>

            <q-tab-panel name="topNews">
                <p class="absolute-center">Work in Progress</p>
            </q-tab-panel>

        </q-tab-panels>
    </q-card>

</template>

<script setup>
import {storeToRefs} from "pinia";
import {ref, watch} from "vue";
import {useMainStore} from "@/store/mainStore.js";
import NewsDetails from "@/components/NewsDetails.vue";

const mainStore = useMainStore();
const {cryptoNews, coin} = storeToRefs(mainStore);
const tab = ref('selectedCoinNews');
const selectedModel = ref({});

watch(coin, () => {
    mainStore.fetchCryptoNews();
});

</script>

<style scoped>

.crypto-news {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.news-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.news-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border: 1px solid black;
    margin: 10px;
    padding: 10px;
}

.news-item__title {
    font-size: 1.5rem;
    font-weight: bold;
}

.news-item__source {
    font-size: 1rem;
    font-weight: bold;
}

.news-item__image {
    width: 100%;
    height: 100%;
}

.news-item__image img {
    width: 100%;
    height: 100%;
}

.news-item__description {
    font-size: 1rem;
}

</style>