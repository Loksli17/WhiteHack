<script setup lang="ts">
    
    import { inject, onMounted, ref, watch } from 'vue';
    import type {Ref}                 from 'vue';

    import type { ToastPluginApi }                 from 'vue-toast-notification';
    import { useUserStore }        from '@/stores/user';
    
    import type { Region }          from './../types/Region';
    import type { EventAttributes } from './../types/Event';

    import RegionService from './../services/RegionService';
    import EventService  from './../services/EventService';
    import SideBar       from "@/components/SideBar/SideBar.vue";


    const Toast = inject("Toast") as ToastPluginApi;

    const store = useUserStore();
    
    let regions: Ref<Array<Region>>          = ref([]);
    let events : Ref<Array<EventAttributes>> = ref([]);

    console.log(store.user);
    
    store.changeUser({
        foo: "bar"
    });
    console.log(store.user?.foo);



    const list = ref([] as Array<EventAttributes>);


    EventService.getAll({limit: 10, offset: 0, regionId: 1}).then((value: any) => {
        events.value = value.data.events;
    });

    console.log(regions.value.length, events);

    onMounted(async () => {
        RegionService.getAll().then((value: any) => {
    
            regions.value = value.data.regions;


            // @ts-ignore
            ymaps.ready(() => {
                // @ts-ignore
                const map = new ymaps.Map("map", {
                    center: [53.01, 158.72],
                    zoom: 12
                }, {
                    searchControlProvider: 'yandex#search'
                });

                for (const region of regions.value) {
                    // @ts-ignore
                    const circle = new ymaps.GeoObject({
                        geometry: {
                            type: "Circle",
                            coordinates: [region.lattitude, region.longitude],
                            radius: 500,
                        },
                        options: {
                            fillColor: "0066ff99",
                        }
                    });

                    circle.events.add("click", (event: any) => {
                        event.preventDefault();
                        event.stopPropagation();
                        
                        console.log("click!");
                    });
    
                    map.geoObjects.add(circle);
                }
            });
        });
    });


    // Toast.success("This is a working toast hell yea");
</script>

<template>
    <!-- <aside>
        <SideBar v-model:list="list" />
    </aside> -->
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
