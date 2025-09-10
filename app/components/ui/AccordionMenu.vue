<template>
    <li
        @click="toggleAccordion(index)"
        role="accordion"
        :class="class"
        class="py-2 pl-2 cursor-pointer flex justify-between group w-full text-sm transition border-[1px] border-white hover:bg-gray-100 rounded-sm list-none">
        <button
            class="bg-transparent flex gap-x-3 items-center text-[#248BFD] text-nowrap">
            <span
                class="text-black text-[.9rem] uppercase font-medium "
                :class="classTitle">{{ title }}</span>
        </button>
        <div 
            class=" flex gap-2 items-center">
            <UButton
                v-if="Boolean(if_add_new)"
                size="xs"
                variant="soft"
                class=" text-[0.7rem] bg-gray-200 text-black hover:bg-white group-hover:bg-white">
                New Project
                <UIcon
                    name="material-symbols:add-rounded"
                    class="w-4 h-4"/>
            </UButton>
            <UIcon 
                name="material-symbols:chevron-right-rounded"
                class="w-6 h-6 text-gray-400 group-hover:text-gray-400 hover:scale-110 transition mr-2.5"
                :class="{
                    'rotate-90': activeIndex === index,
                }"/>
        </div>
    </li>
    <ul
        role="list"
        class="list-none flex flex-col"
        :class="{
            'hidden': activeIndex !== index
        }">
        <slot/>
    </ul>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
    title: string,
    index: number,
    activeIndex: number,
    classTitle: string,
    if_add_new: boolean | null,
    class?: string
}>(),{
    title: '',
    index: 0,
    activeIndex: -1,
    classTitle: '',
    if_add_new: false,
    class: ''
});

/**
 * Begin::Set event trigger to parent component
 */
const emit = defineEmits<{
    (event: 'toggleAccordion', index: number): void;
}>();
/**
 * End::Set event trigger to parent component
 */

/**
 * Begin::Some logical in this component
 */
const toggleAccordion = (index: number): void => {
    emit('toggleAccordion', index);
};
/**
 * End::Some logical in this component
 */
</script>