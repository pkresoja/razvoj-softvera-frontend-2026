<script lang="ts" setup>
import { Alerts } from '@/alerts';
import MainLayout from '@/components/MainLayout.vue';
import router from '@/router';
import { MainService } from '@/services/main.service';
import { computed, ref, watch } from 'vue';

const cartItems = ref<any[]>([])
MainService.useAxios('/cart')
    .then(rsp => cartItems.value = rsp.data)

const total = computed(() =>
    cartItems.value.reduce(
        (sum, c) => sum + c.toy.price * c.count, 0
    )
)

function increment(obj: any) {
    for (let cartItem of cartItems.value) {
        if (cartItem.cartItemId == obj.cartItemId) {
            cartItem.count++

            // update on backend
            updateCount(cartItem.cartItemId, cartItem.count)
        }
    }
}

function decrement(obj: any) {
    for (let cartItem of cartItems.value) {
        if (cartItem.cartItemId == obj.cartItemId) {
            if (cartItem.count == 1) return
            cartItem.count--

            // update on backend
            updateCount(cartItem.cartItemId, cartItem.count)
        }
    }
}

function updateCount(cartItemId: number, count: number) {
    if (count < 1) return
    MainService.useAxios(`/cart/${cartItemId}/count/${count}`, 'put')
}

function remove(cartItem: any) {
    Alerts.showConfirm(`Da li sigurno želite da orbišete ${cartItem.toy.name}?`, () => {
        MainService.useAxios(`/cart/${cartItem.cartItemId}`, 'delete')
        cartItems.value = cartItems.value.filter(ci => ci.cartItemId !== cartItem.cartItemId)
    })
}

function createInvoice() {
    Alerts.showConfirm(`Da li sigurno želite da platite?`, () => {
        MainService.useAxios(`/cart/invoice`, 'post')
        router.push('/user')
    })
}
</script>

<template>
    <MainLayout>
        <div class="card">
            <div class="card-header fw-bold">Moja Korpa</div>
            <div class="card-body">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Naziv</th>
                            <th scope="col">Cena Po Komadu</th>
                            <th scope="col">Broj Komada</th>
                            <th scope="col">Ukupno</th>
                            <th scope="col">Opcije</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="obj in cartItems">
                            <th scope="row">{{ obj.toy.name }}</th>
                            <td scope="row">{{ obj.toy.price }} RSD</td>
                            <td scope="row">
                                <div class="input-group">
                                    <button class="btn btn-sm btn-outline-secondary" @click="decrement(obj)">-</button>
                                    <input type="number" class="form-control form-control-sm text-center"
                                        v-model="obj.count" @change="updateCount(obj.cartItemId, obj.count)" min="1">
                                    <button class="btn btn-sm btn-outline-secondary" @click="increment(obj)">+</button>
                                </div>
                            </td>
                            <td scope="row">{{ obj.toy.price * obj.count }} RSD</td>
                            <td>
                                <button type="button" class="btn btn-sm btn-danger" @click="remove(obj)">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-footer d-flex align-items-center justify-content-between">
                <span class="h6">
                    Ukupno za plaćanje: <strong class="h5">{{ total }} RSD</strong>
                </span>
                <button class="btn btn-success px-3" @click="createInvoice">
                    <i class="fa-solid fa-credit-card"></i> Plati
                </button>
            </div>
        </div>
    </MainLayout>
</template>

<style scoped>
/* Chrome, Safari, Edge */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
}

.btn-outline-secondary {
    width: 32px;
    font-weight: bold;
}

.input-group {
    width: 110px;
}
</style>