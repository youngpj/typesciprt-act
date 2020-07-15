<template>
    <div id="app">
        <transition>
            <router-view class="page-container"></router-view>
        </transition>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
export default class App extends Vue {}
</script>


