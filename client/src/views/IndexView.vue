<script setup lang="ts">
    import { inject, onMounted, ref }              from 'vue';
    import type { ToastPluginApi }                 from 'vue-toast-notification';
    import { useUserStore } from '@/stores/user';

    const Toast = inject("Toast") as ToastPluginApi;

    const store = useUserStore();
    console.log(store.user);
    store.changeUser({
        foo: "bar"
    });
    console.log(store.user?.foo)

    onMounted(async () => {
        // @ts-ignore
        (ymaps as any).ready(() => {
            // @ts-ignore
            const map = new ymaps.Map("map", {
                center: [57, 160],
                zoom: 6
            }, {
                searchControlProvider: 'yandex#search'
            })
        })
    });


    // Toast.success("This is a working toast hell yea");
</script>

<template>
    <main>
        <div id="map"></div>
    </main>
</template>

<style lang="scss">
    main {
        position: relative;
        #map {
            width: 100%;
            height: 100vh;
        }
    }
</style>
