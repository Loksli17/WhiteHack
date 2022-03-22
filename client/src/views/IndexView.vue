<script setup lang="ts">
    
    import { inject, onMounted, ref } from 'vue';
    import type {Ref}                 from 'vue';

    import type { ToastPluginApi }                 from 'vue-toast-notification';
    import { useUserStore }        from '@/stores/user';
    
    import type { Region }          from './../types/Region';
    import type { EventAttributes } from './../types/Event';

    import RegionService from './../services/RegionService';
    import EventService  from './../services/EventService';



    const Toast = inject("Toast") as ToastPluginApi;

    const store = useUserStore();
    
    let regions: Ref<Array<Region>>          = ref([]);
    let events : Ref<Array<EventAttributes>> = ref([]);

    console.log(store.user);
    
    store.changeUser({
        foo: "bar"
    });

    console.log(store.user?.foo);


    RegionService.getAll().then((value: any) => {
        regions.value = value.data.regions;
    });

    EventService.getAll({limit: 10, offset: 0, regionId: 1}).then((value: any) => {
        events.value = value.data.events;
    });

    console.log(regions, events);

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
