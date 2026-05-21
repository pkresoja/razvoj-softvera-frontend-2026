<script lang="ts" setup>
import MainLayout from '@/components/MainLayout.vue';
import { MainService } from '@/services/main.service';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = Number(route.params.id);

const invoice = ref<any>(null);

MainService.useAxios(`/invoice/${id}`)
    .then(rsp => invoice.value = rsp.data);

const total = computed(() => {
    if (!invoice.value?.cartItems) return 0;

    return invoice.value.cartItems.reduce(
        (sum: number, item: any) => sum + item.price * item.count,
        0
    );
});

const formatPrice = (value: number) => {
    return new Intl.NumberFormat('sr-RS', {
        style: 'currency',
        currency: 'RSD'
    }).format(value);
};

const formatDate = (value: string) => {
    return new Date(value).toLocaleString('sr-RS');
};
</script>

<template>
    <MainLayout>
        <div class="container py-4" v-if="invoice">

            <!-- Zaglavlje -->
            <div class="card shadow-sm border-0 mb-4">
                <div class="card-body">
                    <div class="row align-items-center">

                        <div class="col-md-8">
                            <h1 class="h3 mb-1">
                                Faktura #{{ new Date().getFullYear() }}/{{ invoice.invoiceId }}
                            </h1>

                            <p class="text-muted mb-2">
                                ID kupovine:
                                <code>{{ invoice.pursId }}</code>
                            </p>

                            <div class="row g-3 mt-2">
                                <div class="col-sm-6">
                                    <div class="small text-muted">
                                        Datum kreiranja
                                    </div>

                                    <div class="fw-semibold">
                                        {{ formatDate(invoice.createdAt) }}
                                    </div>
                                </div>

                                <div class="col-sm-6">
                                    <div class="small text-muted">
                                        Datum plaćanja
                                    </div>

                                    <div class="fw-semibold text-success">
                                        {{ formatDate(invoice.paidAt) }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- QR kod -->
                        <div class="col-md-4 text-center mt-4 mt-md-0">

                            <img class="img-fluid border rounded p-2 bg-white"
                                :src="`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${invoice.pursId}`"
                                alt="QR kod fakture" />

                            <div class="small text-muted mt-2">
                                Skenirajte za proveru fakture
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <!-- Stavke -->
            <div class="card shadow-sm border-0">
                <div class="card-header bg-white">
                    <h2 class="h5 mb-0">
                        Stavke narudžbine
                    </h2>
                </div>

                <div class="table-responsive">
                    <table class="table align-middle mb-0">

                        <thead class="table-light">
                            <tr>
                                <th>Proizvod</th>
                                <th>Kategorija</th>
                                <th class="text-center">Količina</th>
                                <th class="text-end">Cena</th>
                                <th class="text-end">Ukupno</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="item in invoice.cartItems" :key="item.cartItemId">
                                <td>
                                    <div class="d-flex align-items-center">

                                        <img :src="item.toy.imageUrl" :alt="item.toy.name" class="rounded border me-3"
                                            style="
                                                width: 72px;
                                                height: 72px;
                                                object-fit: cover;
                                            " />

                                        <div>
                                            <div class="fw-semibold">
                                                {{ item.toy.name }}
                                            </div>

                                            <div class="text-muted small">
                                                {{ item.toy.description }}
                                            </div>
                                        </div>

                                    </div>
                                </td>

                                <td>
                                    <span class="badge text-bg-primary">
                                        {{ item.toy.type.name }}
                                    </span>
                                </td>

                                <td class="text-center fw-semibold">
                                    {{ item.count }}
                                </td>

                                <td class="text-end">
                                    {{ formatPrice(item.price) }}
                                </td>

                                <td class="text-end fw-bold">
                                    {{ formatPrice(item.price * item.count) }}
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>

                <!-- Podnožje -->
                <div class="card-body border-top">

                    <div class="row justify-content-end">
                        <div class="col-md-4">

                            <div class="d-flex justify-content-between mb-2">
                                <span class="text-muted">
                                    Međuzbir
                                </span>

                                <span>
                                    {{ formatPrice(total) }}
                                </span>
                            </div>

                            <div class="d-flex justify-content-between mb-2">
                                <span class="text-muted">
                                    PDV
                                </span>

                                <span>
                                    Uključen
                                </span>
                            </div>

                            <hr />

                            <div class="d-flex justify-content-between fs-5 fw-bold">
                                <span>Ukupno</span>

                                <span class="text-success">
                                    {{ formatPrice(total) }}
                                </span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div>

        <!-- Učitavanje -->
        <div v-else class="container py-5 text-center">
            <div class="spinner-border text-primary"></div>

            <div class="mt-3 text-muted">
                Učitavanje fakture...
            </div>
        </div>
    </MainLayout>
</template>