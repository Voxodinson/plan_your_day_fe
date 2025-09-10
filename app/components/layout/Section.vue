<template>
    <li
        class="py-1 block mt-6"
        :class="classTitle">
        <span
            class="text-black pl-2 text-[.9rem] uppercase border-none font-medium"
            :class="{
                [classTitle as string]: classTitle}">
            {{ label }}
        </span>
    </li>
</template>

<script setup lang="ts">
defineProps({
    label: {
        type: String,
        required: true,
        default: ''
    },
    classTitle: {
        type: String,
        required: false,
        default: ''
    }
});
</script>
