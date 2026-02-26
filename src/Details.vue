<script lang="ts" setup>
import { useRoute } from 'vue-router';
import MainLayout from './components/MainLayout.vue';
import { ToyService } from './services/toy.service';
import { ref } from 'vue';
import type { ToyModel } from './models/toy.model';
import { generateImageUrl, targetGroupText } from './utils';

const route = useRoute()
const permalink = String(route.params.permalink)
const toy = ref<ToyModel>()

ToyService.getToyByPermalink(permalink)
    .then(rsp => toy.value = rsp.data)
</script>

<template>
    <MainLayout>
        <div class="row" v-if="toy">
            <div class="col-12 col-md-4 mb-3">
                <img :src="generateImageUrl(toy)" class="img-fluid">
            </div>
            <div class="col-12 col-md-8 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{ toy.name }}</h5>
                        <p class="card-text">{{ toy.description }}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <i class="fa-solid fa-users-viewfinder"></i> Namenjeno za: <strong>{{ targetGroupText(toy) }}</strong>
                        </li>
                        <li class="list-group-item" :title="toy.ageGroup.description">
                            <i class="fa-solid fa-calendar-days"></i> Uzrast: <strong>{{ toy.ageGroup.name }}</strong>
                        </li>
                        <li class="list-group-item" :title="toy.type.description">
                            <i class="fa-solid fa-font-awesome"></i> Tip: <strong>{{ toy.type.name }}</strong>
                        </li>
                        <li class="list-group-item">
                            <i class="fa-solid fa-clock-rotate-left"></i> Datum proizvodnje: <strong>{{ toy.productionDate }}</strong>
                        </li>
                        <li class="list-group-item">
                            <i class="fa-solid fa-money-bill-wave"></i> Cena: <strong>{{ toy.price }} RSD</strong>
                        </li>
                    </ul>
                    <div class="card-footer">
                        <button type="button" class="btn btn-warning m-1">
                            <i class="fa-solid fa-bookmark"></i> Dodaj u omiljene
                        </button>
                        <button type="button" class="btn btn-success m-1">
                            <i class="fa-solid fa-basket-shopping"></i> Dodaj u korpu
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <Loading v-else />
    </MainLayout>
</template>