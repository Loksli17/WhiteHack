<script setup lang="ts">
    import type {EventAttributes} from "@/types/Event";
    import SideBarListElement from "./SideBarListElement.vue";

    defineProps<{
        list: Array<EventAttributes>
    }>();
</script>

<template>
    <div class="side-bar-list">
        <SideBarListElement 
            v-for="elem in list"
            :key="elem.id"
            :element="elem" />
    </div>
</template>

<style lang="scss">
    .side-bar-list {
        // overflow-y: auto;
        // height: 100%;
    }
</style>