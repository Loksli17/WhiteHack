<script setup lang="ts">
    import type { EventAttributes } from "@/types/Event";

    defineProps<{
        element: EventAttributes
    }>();
</script>

<template>
    <router-link :to="`/event/${element.id}`">
        <div class="side-bar-list-element">
            <h3>{{ element.EventType.name }}</h3>
            <p>{{ element.description }}</p>
            <p>{{ element.address }}</p>
            <p>{{ element.time }}</p>
        </div>
    </router-link>
</template>

<style lang="scss" scoped>
    a {
        text-decoration: none;
        color: black;

        .side-bar-list-element {
            border: 1px solid gray;
            border-radius: 8px;
            padding: 10px 30px;
        }
    }
</style>