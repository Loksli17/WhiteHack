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
    
    const 
        regions: Ref<Array<Region>>          = ref([]),
        events : Ref<Array<EventAttributes>> = ref([]),
        regionId: Ref<number> = ref(0);
    
    const showSideBar = ref(false);
    
    store.changeUser({
        foo: "bar"
    });

    onMounted(async () => {
        RegionService.getAll().then((value: any) => {
    
            regions.value = value.data.regions;

            const colors = [
                {
                    fillColor: "ff000080",
                    strokeColor: "ff8080"
                },
                {
                    fillColor: "ffff0080",
                    strokeColor: "ffff00"
                },
                {
                    fillColor: "00ff0080",
                    strokeColor: "00ff00"
                }
            ]

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
                    const circle = new ymaps.GeoObject(
                        {
                            geometry: {
                                type: "Circle",
                                coordinates: [region.lattitude, region.longitude],
                                radius: 500,
                            }
                        },
                        {
                            fillColor: colors[region.pollutionDegree].fillColor,
                            strokeColor: colors[region.pollutionDegree].strokeColor
                        }
                    );

                    circle.events.add("click", (event: any) => {
                        event.preventDefault();
                        event.stopPropagation();

                        EventService.getAll({limit: 10, offset: 0, regionId: region.id}).then((value: any) => {
                            events.value = value.data.events;
                            showSideBar.value = true;
                        });

                        regionId.value = region.id;
                    });

                    circle.events.add("dblclick", (event: any) => event.preventDefault());
    
                    map.geoObjects.add(circle);
                }
            });
        });
    });


    // Toast.success("This is a working toast hell yea");
</script>

<template>
    <SideBar 
        v-model:list="events" 
        v-show="showSideBar"
        :id="regionId"
        @close="showSideBar = !showSideBar" />
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
