<template>
    <div 
        class="w-full h-[100vh] flex">
        <SideBar/>
        <div
            class="w-[calc(100%-44%)] bg-gray-200 dark:bg-slate-700 overflow-y-auto">
            <NuxtPage/>
        </div>
        <RightSidebar/>
    </div>
</template>

<script setup lang="ts">
import { 
    SideBar,
    RightSidebar
} from '~/components/layout';

</script>
