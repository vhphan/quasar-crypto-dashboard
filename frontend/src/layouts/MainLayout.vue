<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">

      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title
            shrink
        >
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" alt="logo">
          </q-avatar>
          <span class="q-ml-md">Crypto Dashboard</span>
        </q-toolbar-title>
        <candle-settings />
          <q-space />
<!--        <q-tabs align="left">-->
<!--          <q-route-tab :to="`${basePath}page1`" label="Page One"/>-->
<!--          <q-route-tab :to="`${basePath}page2`" label="Page Two"/>-->
<!--          <q-route-tab :to="`${basePath}page3`" label="Page Three"/>-->
<!--        </q-tabs>-->
      </q-toolbar>

    </q-header>
    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>
    <q-page-container class="q-px-md">

      <router-view v-slot="{ Component }" :key="$route.fullPath">
        <component :is="Component"/>
      </router-view>

    </q-page-container>

  </q-layout>
</template>
<script setup>
import {basePath} from "../constants.js";
import {ref} from "vue";
import CandleSettings from "@/components/CandleSettings.vue";
const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

</script>