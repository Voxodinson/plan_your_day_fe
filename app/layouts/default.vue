<template>
    <div 
        class="w-full h-[100vh] flex">
        <SideBar/>
        <div
            class="w-[calc(100%-10%)]">
            <NuxtPage/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { 
    SideBar 
} from '~/components/layout';

</script>
