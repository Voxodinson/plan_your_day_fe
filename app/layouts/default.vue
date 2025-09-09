<template>
    <div 
        class="w-full h-[100vh]">
        <SideBar/>
        <div
            class="w-full">
            <NuxtPage/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { 
    SideBar 
} from '~/components/layout';
</script>
