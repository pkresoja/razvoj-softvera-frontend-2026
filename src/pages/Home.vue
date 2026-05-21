<script lang="ts" setup>
import { ref } from 'vue';
import type { ToyModel } from '@/models/toy.model';
import MainLayout from '@/components/MainLayout.vue';
import Loading from '@/components/Loading.vue';
import { MainService } from '@/services/main.service';
import { useRouter } from 'vue-router';
import { AuthService } from '@/services/auth.service';
import { useLogout } from '@/hooks/logout.hook';

const router = useRouter()
const logout = useLogout()
const toys = ref<ToyModel[]>([])

MainService.useAxios('/toy')
    .then(rsp => toys.value = rsp.data)

function addToCart(toy: ToyModel) {
    MainService.useAxios(`/cart/toy/${toy.toyId}`, 'post')
        .then(rsp => router.push('/cart'))
        .catch(() => logout())
}
</script>

<template>
    <MainLayout>
        <div class="toy-wrapper" v-if="toys.length > 0">
            <div v-for="toy of toys" class="card" style="width: 18rem;">
                <img :src="toy.imageUrl" class="card-img-top" :alt="toy.name">
                <div class="card-body">
                    <h5 class="card-title">{{ toy.name }}</h5>
                    <p class="card-text">{{ toy.description }}</p>
                </div>
                <div class="card-footer">
                    <div class="btn-group text-center d-flex justify-content-center">
                        <RouterLink :to="`/toy/${toy.permalink}`" class="btn btn-primary" title="Detaljnije">
                            <i class="fa-solid fa-up-right-from-square"></i> Detalji
                        </RouterLink>
                        <button type="button" class="btn btn-success" @click="addToCart(toy)"
                            v-if="AuthService.hasAuth()" title="Dodaj u korpu">
                            <i class="fa-solid fa-basket-shopping"></i> Kupi
                        </button>
                    </div>

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
