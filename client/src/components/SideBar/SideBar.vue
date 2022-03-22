<script setup lang="ts">
    import type { EventAttributes } from '@/types/Event';
    import { computed } from 'vue';
    import SideBarList          from "./SideBarList.vue";

    const props = defineProps<{
        id: number;
        list: Array<EventAttributes>;
    }>();

    const emit = defineEmits<{
        (e: "update:list", value: Array<EventAttributes>): void;
        (e: "close"): void;
    }>();

    const listComputed = computed({
        get(): Array<EventAttributes> {
            return props.list;
        },
        set(newList: Array<EventAttributes>) {
            emit("update:list", newList);
        }
    })
</script>

<template>
    <div class="side-bar">
        <div>
            <h1>Регион {{ id }}</h1>
            <button @click="$emit('close')">close</button>
        </div>
        <SideBarList :list="listComputed" />
    </div>
</template>

<style lang="scss" scoped>
    .side-bar {
        position: fixed;
        top: 10px;
        left: 10px;
        display: grid;
        grid-template-rows: max-content 85%;
        height: 80%;
        z-index: 2000;
        background-color: white;
        overflow: hidden;
        padding: 20px;
        // box-sizing: border-box;
        border-radius: 8px;
    }
</style>