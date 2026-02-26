<script lang="ts" setup>
import { RouterLink } from 'vue-router';

const year = new Date().getFullYear()
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary mb-3">
        <div class="container-fluid">
            <RouterLink class="navbar-brand" to="/">
                <i class="fa-solid fa-rocket"></i> Igračke
            </RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/" active-class="active">
                            <i class="fa-solid fa-house"></i> Početna
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/about" active-class="active">
                            <i class="fa-solid fa-circle-info"></i> O nama
                        </RouterLink>
                    </li>
                </ul>
                <div class="navbar-text">
                    <i class="fa-solid fa-user"></i> Ime Korisnika
                </div>
            </div>
        </div>
    </nav>
    <slot></slot>
    <footer class="mt-3 text-center">
        &copy; {{ year }} - Univerzitet Singidunum
    </footer>
</template>