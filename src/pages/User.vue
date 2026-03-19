<script lang="ts" setup>
import MainLayout from '@/components/MainLayout.vue';
import { AuthService } from '@/services/auth.service';
import { MainService } from '@/services/main.service';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const favourite = ref<any[]>([])

onMounted(() => {
    if (!AuthService.hasAuth()) {
        router.push('/login')
        return
    }

    MainService.useAxios('/favourite')
    .then(rsp=>{
        favourite.value = rsp.data
    })
})
</script>

<template>
    <MainLayout>
        stranica korisnika
        <pre>{{ favourite }}</pre>
    </MainLayout>
</template>