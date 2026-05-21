<script lang="ts" setup>
import { Alerts } from '@/alerts';
import Loading from '@/components/Loading.vue';
import MainLayout from '@/components/MainLayout.vue';
import { useLogout } from '@/hooks/logout.hook';
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
const invoices = ref<any[]>()
const logout = useLogout()

onMounted(() => {
    if (!AuthService.hasAuth()) {
        router.push('/login')
        return
    }

    MainService.useAxios('/user/self')
        .then(rsp => {
            self.value = rsp.data
        })
        .catch(() => logout())

    MainService.useAxios('/favourite')
        .then(rsp => {
            favourites.value = rsp.data
        })
        .catch(() => logout())

    MainService.useAxios('/cart/invoice')
        .then(rsp => {
            invoices.value = rsp.data
        })
        .catch(() => logout())
})

function removeFromFav(fav: FavouriteModel) {
    Alerts.showConfirm('Obriši iz omiljenih?', () => {
        MainService.useAxios(`/favourite/${fav.favouriteId}`, 'delete')
            .then(rsp => favourites.value = favourites.value.filter(obj => obj.favouriteId !== fav.favouriteId))
            .catch(() => logout())
    })
}

function pay(inv: any) {
    Alerts.showConfirm('Plati racun?', () => {
        MainService.useAxios(`/invoice/${inv.invoiceId}/pay`, 'put')
            .then(rsp => window.location.reload())
            .catch(() => logout())
    })
}
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
            <div class="card mb-3">
                <div class="card-header">
                    <strong>Računi</strong>
                </div>
                <div class="card-body">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Datum</th>
                                <th scope="col">Status</th>
                                <th scope="col">Opcije</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="inv in invoices">
                                <th scope="row">{{ formatDate(inv.createdAt) }}</th>
                                <td>
                                    <span class="text-success fw-bold" v-if="inv.paidAt">Plaćeno</span>
                                    <span class="text-warning fw-bold" v-else>Nije Plaćeno</span>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-sm btn-success" @click="pay(inv)" v-if="!inv.paidAt">
                                        <i class="fa-regular fa-credit-card"></i>
                                    </button>
                                    <RouterLink :to="`/invoice/${inv.invoiceId}`" class="btn btn-sm btn-primary" v-else>
                                        <i class="fa-solid fa-file-invoice"></i>
                                    </RouterLink>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
                                <th scope="col">Opcije</th>
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
                                <td>
                                    <button type="button" class="btn btn-sm btn-danger" @click="removeFromFav(fav)">
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </template>
        <Loading v-else />
    </MainLayout>
</template>