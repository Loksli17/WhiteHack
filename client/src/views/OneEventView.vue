<script setup lang="ts">
    
    import EventService             from '../services/EventService';
    import { useRoute }             from 'vue-router';
    import type { EventAttributes } from '../types/Event';
    import type { Ref }             from 'vue';
    import { ref, onMounted }       from 'vue';

    const route = useRoute();

    const id: number = Number(route.params.id);

    let event: Ref<EventAttributes> = ref({} as EventAttributes);

    EventService.getOne(id).then((value: any) => {
        event.value = value.data.event;
        console.log(event.value);
    });

    onMounted(async () => {

        // @ts-ignore
            ymaps.ready(() => {
            // @ts-ignore
            const map = new ymaps.Map("map", {
                center: [53.01, 158.72],
                zoom: 12
            }, {
                searchControlProvider: 'yandex#search'
            });
        });
    });

</script>


<template>
    <main>

        <div class="page-wrapper">

            <div class="path">
                Главная / Эко-центр
            </div>

            <div class="view-wrapper">

                <div class="row-1">

                    <div class="map">
                        <div id="map"></div>
                    </div>

                    <div class="content">
                        <div v-if="event.EventType">
                            <span class="author">Организатор: {{event.User.name}}</span>
                            <h1>{{event.name}}</h1>

                            <div class="points">
                                + {{event.points}} баллов
                            </div>

                            <div class="desc-wrap">
                                <h3>Описание</h3>
                                <p>{{event.description}}</p>
                            </div>

                            <div class="tools">
                                <h3>Что нужно взять с собой</h3>
                                <p>{{event.tools}}</p>
                            </div>

                            <div class="category">
                                <h3>Категория</h3>
                                <div>
                                    <img src="" alt="">
                                    <span>{{event.EventType.name}}</span>
                                </div>
                            </div>

                            <div class="add-content">
                                <div class="date">{{event.date}}</div>
                                <div class="time">{{event.time}}</div>

                                <div class="tags">
                                    <div class="tag">Активна</div>
                                    <div class="tag">Без-ограничений</div>
                                    <div class="tag">Эко-центр</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-2">
                    <div></div>
                    <div>
                        <button>
                            Подать заявку
                        </button>
                    </div>
                </div>

                <div class="row-3">
                    <div class="image-wrap">
                        <div v-for="image in event.images" :key="image.id" class="img">
                            <div>{{image.file}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

</template>


<style lang="scss">
    main {

        .page-wrapper{
            padding: 40px 180px 0px 180px;
            box-sizing: border-box;
        }

        .view-wrapper{
            margin-top: 40px;
        }

        .path{
            color: #505968;
            font-size: 18px;
        }

        .row-1{
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 50px;

            .content{

                .author{
                    color: #97A0AF;
                    font-size: 18px;
                }

                h1{
                    font-size: 42px;
                    margin: 10px 0px 30px 0px;
                }

                h3{
                    font-size: 22px;
                }

                .points {
                    color: #FF6947;
                    border: 2px solid;
                    padding: 10px;
                    width: max-content;
                    border-radius: 6px;
                    font-size: 20px;
                }

                .desc-wrap, .tools {

                    h3{
                        margin-top: 40px;
                    }

                    p{
                        font-size: 21px;
                    }
                }

                .category{
                    span {
                        font-size: 19px;
                    }
                }
                
                .add-content{
                    margin-top: 30px;
                    display: grid;
                    grid-auto-flow: column;
                    grid-auto-columns: max-content;
                    column-gap: 20px;
                    align-items: center;

                    .date, .time {
                        font-size: 20px;
                        font-weight: 600;
                    }

                    .time{
                        margin-right: 20px;
                    }

                    .tags{
                        display: grid;
                        width: 500px;
                        grid-auto-flow: column;
                        grid-auto-columns: max-content;
                        column-gap: 15px;

                        .tag{
                            color: #0D58B3;
                            padding: 8px;
                            border: 1.5px solid;
                            border-radius: 14px;
                            font-size: 19px;
                        }
                    }
                }
                
            }
            

            .map{

                #map {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .row-2{
            display: grid;
            grid-template-columns: 1fr 1fr;
            margin-top: 30px;
            column-gap: 50px;

            button{
                padding: 15px;
                font-size: 19px;
                filter: drop-shadow(0px 4px 4px rgba(255, 105, 71, 0.25));
                border: 0;
                background: #FF6947;
                color: #fff;
                border-radius: 10px;
                cursor: pointer;
            }
        }


        .row-3{
            margin-top: 40px;
        }

        position: relative;
    }
</style>
