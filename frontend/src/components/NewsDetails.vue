<template>
    <q-card-section>

        <q-spinner v-if="fetching" color="primary" size="2rem"/>
        <div v-else>
            <p>{{ newsDetails?.description }}</p>
            <q-btn :href="`https://cryptopanic.com/news/click/${news.id}/`"
                   target="_blank" glossy label="Open Link"
                   icon="launch"/>

            <!--            <a :href="`https://cryptopanic.com/news/click/${news.id}/`" target="_blank">Link</a>-->

        </div>

    </q-card-section>
</template>
<script>
import {onMounted, ref} from "vue";
import {useMainStore} from "@/store/mainStore.js";
import {triggerNegative} from "@/utils/notifications.js";

export default {
    name: 'news-details',
    props: {
        news: {}
    },
    setup(props) {
        const {id} = props.news;
        const newsDetails = ref({});
        const mainStore = useMainStore();
        const fetching = ref(false);
        const fetchNewsDetails = async () => {
            try {
                fetching.value = true;
                const response = await mainStore.getNewsDetails(id);
                console.log(response);
                newsDetails.value = response;
            } catch (e) {
                console.log(e);
                triggerNegative({
                    message: "Error fetching news details",
                    icon: "report_problem",
                    color: "negative"
                });
            } finally {
                fetching.value = false;
            }
        };
        onMounted(async () => {
            await fetchNewsDetails();
        });
        return {
            newsDetails,
            fetchNewsDetails,
            fetching
        };
    }
};
</script>
<style scoped>


</style>