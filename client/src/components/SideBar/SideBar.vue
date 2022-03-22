<script setup lang="ts">
    import type EventAttributes from '@/types/Event';
    import { computed } from 'vue';
    import SideBarList          from "./SideBarList.vue";

    const props = defineProps<{
        list: Array<EventAttributes>
    }>();

    const emit = defineEmits<{
        (e: "update:list", value: Array<EventAttributes>): void
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
    <div>
        <h1>epic list haha</h1>
        <SideBarList :list="listComputed" />
    </div>
</template>