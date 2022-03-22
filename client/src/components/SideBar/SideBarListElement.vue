<script setup lang="ts">
    import type EventAttributes from "@/types/Event";

    defineProps<{
        element: EventAttributes
    }>();
</script>

<template>
    <div>
        <h3>{{ element.EventType.name }}</h3>
        <p>{{ element.description }}</p>
        <p>{{ element.address }}</p>
        <p>{{ element.time }}</p>
    </div>
</template>