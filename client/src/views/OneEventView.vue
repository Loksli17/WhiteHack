<script setup lang="ts">
    
    import EventService from '../services/EventService';
    import { useRoute }       from 'vue-router';

    const route = useRoute();

    console.log(route.params.id);

    // EventService.getOne();


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
