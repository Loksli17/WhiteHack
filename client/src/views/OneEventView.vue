<script setup lang="ts">
    
    import EventService        from '../services/EventService';
    import { useRoute }        from 'vue-router';
    import type { EventAttributes } from '../types/Event';
    import type { Ref } from 'vue';
    import { ref } from 'vue';

    const route = useRoute();

    const id: number = Number(route.params.id);

    let event: Ref<EventAttributes> = ref({} as EventAttributes);

    EventService.getOne(id).then((value: any) => {
        event.value = value.data.event;
        console.log(event.value);
    });

</script>


<template>
    <main>

        <div class="wrapper">

            <div class="row-1">
                <div class="map">
                
                </div>

                <div class="content">
                    <div v-if="event.EventType">
                        <span>Организатор: {{event.User.name}}</span>
                        <h1>{{event.name}}</h1>

                        <div class="point">
                            + {{event.points}} баллов
                        </div>

                        <div class="desc-wrap">
                            <h4>Описание</h4>
                            <p>{{event.description}}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row-2">
                <div class="image-wrap">
                    <div v-for="image in event.images" :key="image.id" class="img">
                        <div>{{image.file}}</div>
                    </div>
                </div>
            </div>
        </div>
        
        
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
