<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import MainLayout from '@/components/MainLayout.vue';
import type { FavouriteModel } from '@/models/favourite.model';
import type { UserModel } from '@/models/user.model';
import { AuthService } from '@/services/auth.service';
import { MainService } from '@/services/main.service';
import { formatDate, targetGroupText } from '@/utils';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const self = ref<UserModel>()
const favourites = ref<FavouriteModel[]>([])

onMounted(() => {
    if (!AuthService.hasAuth()) {
        router.push('/login')
        return
    }

    MainService.useAxios('/user/self')
        .then(rsp => {
            self.value = rsp.data
        })

    MainService.useAxios('/favourite')
        .then(rsp => {
            favourites.value = rsp.data
        })
})
</script>

<template>
    <MainLayout>
        <template v-if="self && favourites.length > 0">
            <div class="card mb-3">
                <div class="card-header">
                    <strong>Podaci o korisniku</strong>
                </div>
                <div class="card-body">
                    <pre>{{ self }}</pre>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <strong>Omiljene igračke</strong>
                </div>
                <div class="card-body">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Naziv</th>
                                <th scope="col">Namenjeno za</th>
                                <th scope="col">Uzrast</th>
                                <th scope="col">Tip</th>
                                <th scope="col">Cena</th>
                                <th scope="col">Dodato</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="fav in favourites">
                                <th scope="row">{{ fav.toy.name }}</th>
                                <td>{{ targetGroupText(fav.toy) }}</td>
                                <td>{{ fav.toy.ageGroup.name }}</td>
                                <td>{{ fav.toy.type.name }}</td>
                                <td>{{ fav.toy.price }}</td>
                                <td>{{ formatDate(fav.createdAt) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </template>
        <Loading v-else />
    </MainLayout>
</template>