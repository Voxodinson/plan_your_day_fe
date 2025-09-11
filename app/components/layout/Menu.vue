<template>
    <li
        class="group w-full text-sm transition border-white hover:bg-gray-100 rounded-sm list-none mt-2"
        :class="{
            'bg-slate-200': route.path === path,
            'bg-transparent': route.path !== path,
            [className as string]: className
        }">
        <NuxtLink
            :to="path"
            class="flex items-center py-2 p-2 justify-between w-full text-black text-nowrap group cursor-pointer">
            <div 
                class="flex items-center gap-2">
                <UIcon
                    v-if="typeof(icon) === 'string'"
                    :name="(icon as string)"
                    class="w-4.5 h-4.5"
                    :class="{
                        'text-purple-600': route.path === path,
                        'text-gray-500': route.path !== path
                    }"/>
                <component
                    v-else
                    :is="icon"/>
                <span
                    :title="title"
                    class="text-[.9rem] font-medium mt-0.5"
                    :class="{
                        'text-purple-600': route.path === path,
                        'text-gray-500': route.path !== path,
                        [classTitle as string]: classTitle
                    }">
                    {{ title }}
                </span>
            </div>
            <UKbd 
                :value="len_num" />
        </NuxtLink>
    </li>
</template>

<script setup lang="ts">
import {
    type RouteLocationNormalizedLoadedGeneric
} from "vue-router";
import {
    type DefineComponent
} from "vue";

withDefaults(defineProps<{
    icon: string | DefineComponent<any, any, any>,
    title: string,
    path: string,
    className?: string,
    classTitle: string,
    len_show: boolean | null,
    len_num: string
}>(),{
    icon: '',
    title: '',
    path: '',
    className: '',
    classTitle: '',
    len_show: false,
    len_num: '0'
});


/**
 * Begin::Declare variable section
 */
const route: RouteLocationNormalizedLoadedGeneric = useRoute();
/**
 * End::Declare variable section
 */

</script>