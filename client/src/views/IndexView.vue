<script setup lang="ts">
    import { inject, onMounted, ref }              from 'vue';
    import type { ToastPluginApi }                 from 'vue-toast-notification';
    import { useUserStore }                        from '@/stores/user';

    import SideBar                                 from "@/components/SideBar/SideBar.vue";
    import type EventAttributes from '@/types/Event';

    const Toast = inject("Toast") as ToastPluginApi;

    const store = useUserStore();
    console.log(store.user);
    store.changeUser({
        foo: "bar"
    });
    console.log(store.user?.foo);


    const list = ref([] as Array<EventAttributes>);

    const regionList = ref([
        {
            lat: 57,
            lon: 160
        },
        {
            lat: 56.32,
            lon: 160.85
        }
    ]);

    onMounted(async () => {
        // @ts-ignore
        ymaps.ready(() => {
            // @ts-ignore
            const map = new ymaps.Map("map", {
                center: [57, 160],
                zoom: 8
            }, {
                searchControlProvider: 'yandex#search'
            });

            for (const region of regionList.value) {
                // @ts-ignore
                const circle = new ymaps.GeoObject({
                    geometry: {
                        type: "Circle",
                        coordinates: [...Object.values(region)],
                        radius: 5000
                    },
                    options: {
                        fillColor: "00696969"
                    }
                })

                map.geoObjects.add(circle);
            }
        })
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
