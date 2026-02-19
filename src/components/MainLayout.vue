<script lang="ts" setup>
import { RouterLink } from 'vue-router';

const year = new Date().getFullYear()
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Igračke</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/" active-class="active">
                            Početna
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/about" active-class="active">
                            O nama
                        </RouterLink>
                    </li>
                </ul>
                <div class="navbar-text">Ime korisnika</div>
            </div>
        </div>
    </nav>
    <slot></slot>
    <footer class="mt-3 text-center">
        &copy; {{ year }} - Univerzitet Singidunum
    </footer>
</template>