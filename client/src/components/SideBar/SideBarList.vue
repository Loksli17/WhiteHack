<script setup lang="ts">
    import type EventAttributes from "@/types/Event";
    import SideBarListElement from "./SideBarListElement.vue";

    defineProps<{
        list: Array<EventAttributes>
    }>();
</script>

<template>
    <div>
        <SideBarListElement 
            v-for="elem in list"
            :key="elem.id"
            :element="elem" />
    </div>
</template>