 typeimport { inject } from 'vue';
<script setup lang="ts">
    import TheWelcome              from '@/components/TheWelcome.vue';
    import { inject }              from 'vue';
    import type { ToastPluginApi } from 'vue-toast-notification';

    const Toast = inject("Toast") as ToastPluginApi;

    Toast.success("This is a working toast hell yea");
</script>

<template>
    <main>
        <TheWelcome />
    </main>
</template>
