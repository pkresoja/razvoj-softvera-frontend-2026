<script lang="ts" setup>
import { ref } from 'vue';
import type { ToyModel } from './models/toy.model';
import { ToyService } from './services/toy.service';
import MainLayout from './components/MainLayout.vue';
import { generateImageUrl } from './utils';
import Loading from './components/Loading.vue';

const toys = ref<ToyModel[]>([])

ToyService.getToys()
    .then(rsp => toys.value = rsp.data)
</script>

<template>
    <MainLayout>
        <div class="toy-wrapper" v-if="toys.length > 0">
            <div v-for="toy of toys" class="card" style="width: 18rem;">
                <img :src="generateImageUrl(toy)" class="card-img-top" :alt="toy.name">
                <div class="card-body">
                    <h5 class="card-title">{{ toy.name }}</h5>
                    <p class="card-text">{{ toy.description }}</p>
                </div>
                <div class="card-footer">
                    <RouterLink :to="`/toy/${toy.permalink}`" class="btn btn-primary">
                       <i class="fa-solid fa-up-right-from-square"></i> Detaljnije
                    </RouterLink>
                </div>
            </div>
        </div>
        <Loading v-else />
    </MainLayout>
</template>

<style>
    .toy-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 5px;
    }
</style>
